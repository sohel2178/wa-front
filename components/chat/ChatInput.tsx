"use client";

import { useState } from "react";
import api from "@/lib/api";

import ImageUploadButton from "./ImageUploadButton";
import ImagePreviewDialog from "./ImagePreviewDialog";
import DocumentUploadButton from "./DocumentUploadButton";
import DocumentPreviewDialog from "./DocumentPreviewDialog";
import AudioUploadButton from "./AudioUploadButton";
import AudioPreviewDialog from "./AudioPreviewDialog";
import VoiceRecorder from "./VoiceRecorder";
import VoicePreviewDialog from "./VoicePreviewDialog";
import VideoUploadButton from "./VideoUploadButton";
import VideoPreviewDialog from "./VideoPreviewDialog";

type Props = {
  conversationId: string;
};

export default function ChatInput({ conversationId }: Props) {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [showDocumentDialog, setShowDocumentDialog] = useState(false);
  const [sendingDocument, setSendingDocument] = useState(false);

  const [audioFile, setAudioFile] = useState<File | null>(null);

  const [showAudioDialog, setShowAudioDialog] = useState(false);

  const [sendingAudio, setSendingAudio] = useState(false);

  const [voiceFile, setVoiceFile] = useState<File | null>(null);

  const [showVoiceDialog, setShowVoiceDialog] = useState(false);
  const [sendingVoice, setSendingVoice] = useState(false);

  const [videoFile, setVideoFile] = useState<File | null>(null);

  const [showVideoDialog, setShowVideoDialog] = useState(false);

  const [sendingVideo, setSendingVideo] = useState(false);
  const [sendingImage, setSendingImage] = useState(false);

  const sendVideo = async (caption: string) => {
    if (!videoFile) return;

    setSendingVideo(true);

    try {
      const formData = new FormData();

      formData.append("file", videoFile);

      formData.append("conversationId", conversationId);

      formData.append("caption", caption);

      await api.post("/media/video", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setVideoFile(null);

      setShowVideoDialog(false);
    } catch (error) {
      console.error("Video upload failed:", error);
    } finally {
      setSendingVideo(false);
    }
  };

  const sendImage = async (caption: string) => {
    if (!imageFile) return;

    setSendingImage(true);

    try {
      const formData = new FormData();

      formData.append("file", imageFile);

      formData.append("conversationId", conversationId);

      formData.append("caption", caption);

      await api.post("/media/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setImageFile(null);
      setShowPreview(false);
    } catch (error) {
      console.error("Video upload failed:", error);
    } finally {
      setSendingImage(false);
    }
  };

  const sendVoice = async () => {
    if (!voiceFile) return;

    try {
      setSendingVoice(true);

      const formData = new FormData();

      formData.append("file", voiceFile);

      formData.append("conversationId", conversationId);

      await api.post("/media/voice", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setVoiceFile(null);

      setShowVoiceDialog(false);
    } catch (error) {
      console.error(error);
    } finally {
      setSendingVoice(false);
    }
  };

  const sendAudio = async () => {
    if (!audioFile) return;

    setSendingAudio(true);

    try {
      const formData = new FormData();

      formData.append("file", audioFile);

      formData.append("conversationId", conversationId);

      await api.post("/media/audio", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setAudioFile(null);

      setShowAudioDialog(false);
    } finally {
      setSendingAudio(false);
    }
  };

  const send = async () => {
    const messageText = text.trim();

    if (!messageText || sending) return;

    const optimisticMessage = {
      _id: `temp-${Date.now()}`,
      text: messageText,
      direction: "outbound",
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    setText("");
    setSending(true);

    try {
      const { data } = await api.post("/messages/send-whatsapp", {
        conversationId,
        text: messageText,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setSending(false);
    }
  };

  const sendDocument = async () => {
    if (!documentFile) return;

    try {
      setSendingDocument(true);

      const formData = new FormData();

      formData.append("file", documentFile);

      formData.append("conversationId", conversationId);

      await api.post("/media/document", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setShowDocumentDialog(false);

      setDocumentFile(null);
    } catch (error) {
      console.error(error);
    } finally {
      setSendingDocument(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="border-t p-4">
      <div className="flex gap-2">
        <DocumentUploadButton
          onSelect={(file) => {
            setDocumentFile(file);
            setShowDocumentDialog(true);
          }}
        />
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 border rounded p-2"
          disabled={sending}
        />

        <button
          onClick={send}
          disabled={sending || !text.trim()}
          className="border px-4 rounded disabled:opacity-50"
        >
          {sending ? "Sending..." : "Send"}
        </button>

        <ImageUploadButton
          onSelect={(file) => {
            setImageFile(file);
            setShowPreview(true);
          }}
        />

        <VideoUploadButton
          onSelect={(file) => {
            setVideoFile(file);
            setShowVideoDialog(true);
          }}
        />

        <AudioUploadButton
          onSelect={(file) => {
            setAudioFile(file);
            setShowAudioDialog(true);
          }}
        />

        <VoiceRecorder
          onRecorded={(file) => {
            setVoiceFile(file);
            setShowVoiceDialog(true);
          }}
        />
      </div>

      <ImagePreviewDialog
        file={imageFile}
        loading={sendingImage}
        open={showPreview && !!imageFile}
        onClose={() => setShowPreview(false)}
        onSend={sendImage}
      />

      <DocumentPreviewDialog
        file={documentFile}
        open={showDocumentDialog}
        loading={sendingDocument}
        onClose={() => {
          setShowDocumentDialog(false);
          setDocumentFile(null);
        }}
        onSend={sendDocument}
      />

      <AudioPreviewDialog
        file={audioFile}
        open={showAudioDialog}
        loading={sendingAudio}
        onClose={() => {
          setShowAudioDialog(false);
          setAudioFile(null);
        }}
        onSend={sendAudio}
      />

      <VoicePreviewDialog
        file={voiceFile}
        open={showVoiceDialog}
        loading={sendingVoice}
        onClose={() => {
          setShowVoiceDialog(false);
          setVoiceFile(null);
        }}
        onSend={sendVoice}
      />

      <VideoPreviewDialog
        file={videoFile}
        open={showVideoDialog}
        loading={sendingVideo}
        onClose={() => {
          setShowVideoDialog(false);
          setVideoFile(null);
        }}
        onSend={sendVideo}
      />
    </div>
  );
}
