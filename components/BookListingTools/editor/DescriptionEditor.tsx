import { Editor, EditorState, RichUtils, convertToRaw } from "draft-js";
import React, { useEffect, useRef, useState } from "react";
import "draft-js/dist/Draft.css";
import { stateToHTML } from "draft-js-export-html";
import { useCustomDeviceSize, EScreenSize } from "@/utils/useDeviceSize";
import {
  BoldIcon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
  ItalicIcon,
  TicketsPlaneIcon,
  UnderlineIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";
import HintWrapper from "@/utils/hint";
import { useToast } from "@/hooks/use-toast";

const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}

const INLINE_STYLES = [
  { label: "Bold", style: "BOLD", icon: <BoldIcon className="mt-0.5 w-5" /> },
  {
    label: "Italic",
    style: "ITALIC",
    icon: <ItalicIcon className="mt-0.5 w-5" />,
  },
  {
    label: "Underline",
    style: "UNDERLINE",
    icon: <UnderlineIcon className="mt-0.5 w-5" />,
  },
];

const BLOCK_TYPES = [
  {
    label: "Normal",
    style: "unstyled",
    icon: (
      <svg
        className="mt-0.5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#00000"
      >
        <path d="M280-280h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm-80 480q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
      </svg>
    ),
  },
  {
    label: "H4",
    style: "header-four",
    icon: <Heading4Icon className="w-5" />,
  },
  {
    label: "H5",
    style: "header-five",
    icon: <Heading5Icon className="w-5" />,
  },
  {
    label: "H6",
    style: "header-six",
    icon: <Heading6Icon className="w-5" />,
  },

  {
    label: "Bullet List",
    style: "unordered-list-item",
    icon: (
      <svg
        className="mt-0.5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#00000"
      >
        <path d="M360-200v-80h480v80H360Zm0-240v-80h480v80H360Zm0-240v-80h480v80H360ZM200-160q-33 0-56.5-23.5T120-240q0-33 23.5-56.5T200-320q33 0 56.5 23.5T280-240q0 33-23.5 56.5T200-160Zm0-240q-33 0-56.5-23.5T120-480q0-33 23.5-56.5T200-560q33 0 56.5 23.5T280-480q0 33-23.5 56.5T200-400Zm0-240q-33 0-56.5-23.5T120-720q0-33 23.5-56.5T200-800q33 0 56.5 23.5T280-720q0 33-23.5 56.5T200-640Z" />
      </svg>
    ),
  },
  {
    label: "Numbered List",
    style: "ordered-list-item",
    icon: (
      <svg
        className="mt-0.5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#00000"
      >
        <path d="M120-80v-60h100v-30h-60v-60h60v-30H120v-60h120q17 0 28.5 11.5T280-280v40q0 17-11.5 28.5T240-200q17 0 28.5 11.5T280-160v40q0 17-11.5 28.5T240-80H120Zm0-280v-110q0-17 11.5-28.5T160-510h60v-30H120v-60h120q17 0 28.5 11.5T280-560v70q0 17-11.5 28.5T240-450h-60v30h100v60H120Zm60-280v-180h-60v-60h120v240h-60Zm180 440v-80h480v80H360Zm0-240v-80h480v80H360Zm0-240v-80h480v80H360Z" />
      </svg>
    ),
  },
  {
    label: "Clear",
    style: "CLEAR",
    icon: (
      <svg
        className="mt-0.5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#00000"
      >
        <path d="m500-120-56-56 142-142-142-142 56-56 142 142 142-142 56 56-142 142 142 142-56 56-142-142-142 142Zm-220 0v-80h80v80h-80Zm-80-640h-80q0-33 23.5-56.5T200-840v80Zm80 0v-80h80v80h-80Zm160 0v-80h80v80h-80Zm160 0v-80h80v80h-80Zm160 0v-80q33 0 56.5 23.5T840-760h-80ZM200-200v80q-33 0-56.5-23.5T120-200h80Zm-80-80v-80h80v80h-80Zm0-160v-80h80v80h-80Zm0-160v-80h80v80h-80Zm640 0v-80h80v80h-80Z" />
      </svg>
    ),
  },
];

const StyleButton = ({ active, label, style, onToggle, icon }) => {
  const handleToggle = (e) => {
    e.preventDefault();
    onToggle(style);
  };

  const { size } = useCustomDeviceSize();

  const [isActive, setIsActive] = useState(active);

  useEffect(() => {
    setIsActive(active);
  }, [active]);

  console.log("isActive", size);

  let show = size == EScreenSize.Mobile || size == EScreenSize.Tablet;

  return (
    <span
      className={`px-2 py-1 text-sm font-medium text-gray-700  cursor-pointer 
         ${isActive ? "bg-primary-150 text-primary font-bold" : ""}`}
      onMouseDown={handleToggle}
    >
      {show ? icon : label}
    </span>
  );
};

const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return (
    <div className="flex gap-2 ml-2">
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
          icon={type.icon || <TicketsPlaneIcon />}
        />
      ))}
    </div>
  );
};

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="flex">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
          icon={type.icon}
        />
      ))}
    </div>
  );
};

const MAX_CHAR_COUNT = 4000;

const DescriptionEditor = ({ editorState, setEditorState, editor }) => {
  // tools h1, h2, h3, h4, h5, h6, blockquote, code, link, ul, ol, bold, italic, underline, strikethrough, code, highlight, clear
  // List of tools to show in the toolbar

  // const format = [
  //   {label: "Normal", style: "unstyled"},
  //   {label: "H4", style: "header-four"},
  //   {label: "H5", style: "header-five"},
  //   {label: "H6", style: "header-six"},
  // ]

  //   const focusEditor = () => {
  //     editor.current.focus();
  //   };

  const [characterCount, setCharacterCount] = useState(0);

  useEffect(() => {
    const content = editorState.getCurrentContent();
    const text = content.getPlainText("");
    setCharacterCount(text.length);
  }, [editorState]);

  const handleToolClick = (style) => {
    if (style === "CLEAR") {
      setEditorState(EditorState.createEmpty());
    } else {
      const newState = RichUtils.toggleInlineStyle(editorState, style);
      setEditorState(newState);
    }
  };

  const toggleInlineStyle = (style) => {
    // event.preventDefault();
    // let style = event.currentTarget.getAttribute('data-style');
    // this.setState({
    //   editorState: RichUtils.toggleInlineStyle(this.state.editorState, style)
    // });
    const newState = RichUtils.toggleInlineStyle(editorState, style);
    setEditorState(newState);
  };

  useEffect(() => {
    setEditorState(EditorState.createEmpty());
  }, []);

  function onTab(e) {
    const maxDepth = 4;
    // this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
    const newState = RichUtils.onTab(e, editorState, maxDepth);
    setEditorState(newState);
  }

  function handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return true;
    }
    return false;
  }

  // _toggleBlockType(blockType) {
  //   this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  // }
  function toggleBlockType(blockType) {
    const newState = RichUtils.toggleBlockType(editorState, blockType);
    setEditorState(newState);
  }

  const handleBeforeInput = (chars, editorState) => {
    const currentContent = editorState.getCurrentContent();
    const currentLength = currentContent.getPlainText("").length;

    if (currentLength >= MAX_CHAR_COUNT) {
      // Prevent further input when character limit is reached
      alert(`You can only input ${MAX_CHAR_COUNT} characters`);
      return "handled";
    }
    return "not-handled";
  };

  const handlePastedText = (pastedText, html, editorState) => {
    const currentContent = editorState.getCurrentContent();
    const currentLength = currentContent.getPlainText("").length;

    if (currentLength + pastedText.length > MAX_CHAR_COUNT) {
      // Prevent pasting when character limit is reached
      alert(`You can only input ${MAX_CHAR_COUNT} characters`);
      return "handled";
    }
    return "not-handled";
  };

  const { toast } = useToast();

  const handleCopyDescription = () => {
    const contentState = editorState.getCurrentContent();
    const html = stateToHTML(contentState);
    const blob = new Blob([html], { type: "text/html" });
    const clipboardItem = new window.ClipboardItem({ "text/html": blob });
    navigator.clipboard.write([clipboardItem]);

    toast({
      title: "Description Copied",
      description: "Description has been copied to clipboard",
    });
  };

  return (
    <div
      style={{
        border: "1px solid #ccc ",
        borderRadius: "20px",
        padding: "10px",
        background: "#f7f6f8",
      }}
    >
      {/* Toolbar */}
      <div className="bg-transparent p-2  rounded-lg shadow-none ">
        <div className="flex flex-col items-center space-x-4">
          {/* Block Style Controls */}
          <BlockStyleControls
            editorState={editorState}
            onToggle={toggleBlockType}
            className="bg-white hover:bg-blue-100 px-2 py-1 rounded-md transition duration-200 ease-in-out"
          />
          {/* Inline Style Controls */}
          <InlineStyleControls
            editorState={editorState}
            onToggle={toggleInlineStyle}
            className="bg-white hover:bg-blue-100 px-2 py-1 rounded-md transition duration-200 ease-in-out"
          />
        </div>
      </div>

      {/* Editor */}
      <div
        style={{
          minHeight: "200px",
        }}
        className="bg-white  p-3 rounded-lg"
      >
        <Editor
          ref={editor}
          blockStyleFn={getBlockStyle}
          editorState={editorState}
          onChange={setEditorState}
          customStyleMap={styleMap}
          placeholder="Write something..."
          onTab={onTab}
          spellCheck={true}
          handleBeforeInput={handleBeforeInput}
          handlePastedText={handlePastedText}
        />
      </div>

      {/* Character count */}
      <div className="flex justify-between items-center mt-2 px-2">
        <h6
          style={{
            fontSize: "12px",
          }}
          className=" text-gray-500"
        >
          {characterCount}/4,000 characters used
        </h6>
        <div className=" flex justify-end">
          <HintWrapper hint="Copy Description">
            <button className="ml-2 w-fit" onClick={handleCopyDescription}>
              <CopyIcon className="w-4" />
            </button>
          </HintWrapper>
        </div>
      </div>
    </div>
  );
};

export default DescriptionEditor;
