import DocViewer, {
  DocViewerRenderers,
  IDocument,
} from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import styles from "@/styles/bsr-and-asin/ChartControlsStyles";

export interface IReactDocViewerProps {
  documents: IDocument[];
}

export default function ReactDocViewer({ documents }: IReactDocViewerProps) {
  return (
    <DocViewer
      onDocumentChange={() => {
        console.log("Document changed");
      }}
      prefetchMethod="GET" // for remote fetch
      documents={documents}
      config={{
        header: {
          disableHeader: true,
        },
      }}
      pluginRenderers={DocViewerRenderers}
    />
  );
}
