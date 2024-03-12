import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Header, Icon } from "semantic-ui-react";
import "../style/photoWidgetDropzone.css";

interface Props {
  setFiles: (files: any) => void;
}

export default function PhotoWidgetDropzone({ setFiles }: Props) {
  const dzStyles = {
    border: "dashed 2px #eee",
    backgroundColor: "#f6f6f6",
    borderColor: "#eee",
    borderRadius: "5px",
    paddingTop: "30px",
    textAlign: "center" as "center",
    height: 120,
    width: "60%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "20px",
    marginBottom: "20px",
  };

  const dzActive = {
    borderColor: "olive",
  };

  const onDrop = useCallback(
    (acceptedFiles: object[]) => {
      setFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Header as="h3">Upload Image</Header>
      </div>

      <div
        {...getRootProps()}
        style={isDragActive ? { ...dzStyles, ...dzActive } : dzStyles}
        className="dropzone"
      >
        <input {...getInputProps()} />
        <Icon name="upload" size="large" />
        <Header as="h4" content="Drop file here or click to select a file" />
      </div>
    </>
  );
}
