let controlDiv = null;

export default controlDiv;
export function hideControlDiv() {
  if (controlDiv) {
    controlDiv.style.display = "none";
  }
}

export function renderControlDiv(left, top, canvas) {
  if (!controlDiv) {
    controlDiv = document.createElement("div");
    controlDiv.style.position = "absolute";
    controlDiv.style.backgroundColor = "white";
    controlDiv.style.border = "1px solid #ccc";
    controlDiv.style.padding = "5px";
    controlDiv.style.fontFamily = "Space Grotesk";
    // controlDiv.style.zIndex = "";
    controlDiv.style.borderRadius = "5px";
    controlDiv.style.boxShadow = "rgba(0, 0, 0, 0.1) 0px 4px 12px";

    const deleteButton = document.createElement("button");

    const deleteIcon = document.createElement("img");
    deleteIcon.src =
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjMDAwMDAwIj48cGF0aCBkPSJNMjgwLTEyMHEtMzMgMC01Ni41LTIzLjVUMjAwLTIwMHYtNTIwaC00MHYtODBoMjAwdi00MGgyNDB2NDBoMjAwdjgwaC00MHY1MjBxMCAzMy0yMy41IDU2LjVUNjgwLTEyMEgyODBabTQwMC02MDBIMjgwdjUyMGg0MDB2LTUyMFpNMzYwLTI4MGg4MHYtMzYwaC04MHYzNjBabTE2MCAwaDgwdi0zNjBoLTgwdjM2MFpNMjgwLTcyMHY1MjAtNTIwWiIvPjwvc3ZnPg==";
    deleteIcon.style.height = "18px";
    deleteIcon.style.width = "18px";
    deleteIcon.style.marginRight = "2px";

    deleteButton.appendChild(deleteIcon);
    // deleteButton.appendChild(document.createTextNode("Delete"));

    deleteButton.style.margin = "0px 6px";
    deleteButton.style.fontFamily = "Space Grotesk";
    deleteButton.style.fontWeight = "700";
    deleteButton.style.fontSize = "16px";
    deleteButton.style.display = "flex";
    deleteButton.style.alignItems = "center";
    deleteButton.onclick = () => {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        canvas.remove(activeObject);
        canvas.requestRenderAll();
        hideControlDiv();
      }
    };

    const duplicateButton = document.createElement("button");

    const duplicateIcon = document.createElement("img");
    duplicateIcon.src =
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjMDAwMDAwIj48cGF0aCBkPSJNNzYwLTIwMEgzMjBxLTMzIDAtNTYuNS0yMy41VDI0MC0yODB2LTU2MHEwLTMzIDIzLjUtNTYuNVQzMjAtOTIwaDI4MGwyNDAgMjQwdjQwMHEwIDMzLTIzLjUgNTYuNVQ3NjAtMjAwWk01NjAtNjQwdi0yMDBIMzIwdjU2MGg0NDB2LTM2MEg1NjBaTTE2MC00MHEtMzMgMC01Ni41LTIzLjVUODAtMTIwdi01NjBoODB2NTYwaDQ0MHY4MEgxNjBabTE2MC04MDB2MjAwLTIwMCA1NjAtNTYwWiIvPjwvc3ZnPg==";
    duplicateIcon.style.height = "18px";
    duplicateIcon.style.width = "18px";
    duplicateIcon.style.marginRight = "4px";

    duplicateButton.appendChild(duplicateIcon);
    // duplicateButton.appendChild(document.createTextNode("Duplicate"));

    duplicateButton.style.margin = "0px 6px";
    duplicateButton.style.fontFamily = "Space Grotesk";
    duplicateButton.style.fontWeight = "700";
    duplicateButton.style.fontSize = "16px";
    duplicateButton.style.display = "flex";
    duplicateButton.style.alignItems = "center";
    duplicateButton.onclick = async () => {
      // duplicate the object
      const activeObject = canvas.getActiveObject();
      const cloned = await activeObject.clone();
      cloned.set({
        left: cloned.left + 100,
        top: cloned.top + 100
      });
      canvas.add(cloned);
      canvas.setActiveObject(cloned); // Set the cloned object as the active object
      canvas.renderAll();
    };

    controlDiv.appendChild(deleteButton);
    controlDiv.appendChild(duplicateButton);

    document.body.appendChild(controlDiv);
  }

  controlDiv.style.left = `${left}px`;
  controlDiv.style.top = `${top}px`;
  controlDiv.style.display = "flex";
}
