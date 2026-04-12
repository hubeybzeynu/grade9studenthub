import { useState, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
  url: string;
  initialPage?: number;
}

const PdfViewer = ({ url, initialPage = 1 }: PdfViewerProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(initialPage);
  const [scale, setScale] = useState(1.0);
  const [containerWidth, setContainerWidth] = useState(400);

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(Math.min(initialPage, numPages));
  }, [initialPage]);

  const containerRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      const observer = new ResizeObserver((entries) => {
        setContainerWidth(entries[0].contentRect.width);
      });
      observer.observe(node);
      setContainerWidth(node.clientWidth);
    }
  }, []);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= numPages) setPageNumber(page);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Controls bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-card border-b border-border shrink-0">
        <div className="flex items-center gap-1">
          <button
            onClick={() => goToPage(pageNumber - 1)}
            disabled={pageNumber <= 1}
            className="p-2 rounded-lg bg-muted disabled:opacity-30 active:bg-accent transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1 px-2">
            <input
              type="number"
              value={pageNumber}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (!isNaN(val)) goToPage(val);
              }}
              className="w-12 text-center text-sm bg-muted rounded-lg py-1 border-none focus:outline-none focus:ring-1 focus:ring-primary"
              min={1}
              max={numPages}
            />
            <span className="text-xs text-muted-foreground">/ {numPages}</span>
          </div>
          <button
            onClick={() => goToPage(pageNumber + 1)}
            disabled={pageNumber >= numPages}
            className="p-2 rounded-lg bg-muted disabled:opacity-30 active:bg-accent transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setScale(s => Math.max(0.5, s - 0.2))}
            className="p-2 rounded-lg bg-muted active:bg-accent transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs text-muted-foreground w-10 text-center">{Math.round(scale * 100)}%</span>
          <button
            onClick={() => setScale(s => Math.min(3, s + 0.2))}
            className="p-2 rounded-lg bg-muted active:bg-accent transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setScale(1.0)}
            className="p-2 rounded-lg bg-muted active:bg-accent transition-colors"
          >
            <Maximize2 className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* PDF content */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto flex justify-center"
        style={{ touchAction: 'pan-x pan-y' }}
      >
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex items-center justify-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
              />
            </div>
          }
          error={
            <div className="text-center py-20 px-4">
              <p className="text-destructive text-sm">Failed to load PDF.</p>
              <p className="text-muted-foreground text-xs mt-1">Make sure the file exists in textbooks folder.</p>
            </div>
          }
        >
          <Page
            pageNumber={pageNumber}
            width={containerWidth * scale}
            renderTextLayer={true}
            renderAnnotationLayer={true}
          />
        </Document>
      </div>
    </div>
  );
};

export default PdfViewer;
