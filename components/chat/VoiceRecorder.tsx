// "use client";

// import { useRef, useState } from "react";

// type Props = {
//   onRecorded: (file: File) => void;
// };

// export default function VoiceRecorder({ onRecorded }: Props) {
//   const mediaRecorderRef = useRef<MediaRecorder | null>(null);

//   const chunksRef = useRef<Blob[]>([]);

//   const [recording, setRecording] = useState(false);

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         audio: true,
//       });

//       const recorder = new MediaRecorder(stream);

//       chunksRef.current = [];

//       recorder.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           chunksRef.current.push(event.data);
//         }
//       };

//       recorder.onstop = () => {
//         const actualMimeType = recorder.mimeType.includes("ogg")
//           ? "audio/ogg"
//           : "audio/webm";

//         const extension = actualMimeType === "audio/ogg" ? "ogg" : "webm";

//         const blob = new Blob(chunksRef.current, {
//           type: actualMimeType,
//         });

//         const file = new File([blob], `voice-${Date.now()}.${extension}`, {
//           type: actualMimeType,
//         });

//         console.log("Voice File Type:", file.type);
//         console.log("Voice File Name:", file.name);

//         onRecorded(file);

//         stream.getTracks().forEach((track) => track.stop());
//       };

//       recorder.start();

//       mediaRecorderRef.current = recorder;

//       setRecording(true);
//     } catch (error) {
//       console.error(error);

//       alert("Microphone permission denied.");
//     }
//   };

//   const stopRecording = () => {
//     mediaRecorderRef.current?.stop();

//     setRecording(false);
//   };

//   return (
//     <button
//       type="button"
//       onClick={recording ? stopRecording : startRecording}
//       className={`border rounded px-3 py-2 ${
//         recording ? "bg-red-500 text-white" : ""
//       }`}
//     >
//       {recording ? "⏹️" : "🎤"}
//     </button>
//   );
// }

"use client";

import { useRef, useState } from "react";

type Props = {
  onRecorded: (file: File) => void;
};

export default function VoiceRecorder({ onRecorded }: Props) {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const streamRef = useRef<MediaStream | null>(null);

  const chunksRef = useRef<Blob[]>([]);

  const [recording, setRecording] = useState(false);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      streamRef.current = stream;

      let mimeType = "";

      if (MediaRecorder.isTypeSupported("audio/ogg;codecs=opus")) {
        mimeType = "audio/ogg;codecs=opus";
      } else if (MediaRecorder.isTypeSupported("audio/webm;codecs=opus")) {
        mimeType = "audio/webm;codecs=opus";
      }

      console.log("Recording MIME:", mimeType || "browser default");

      const recorder = mimeType
        ? new MediaRecorder(stream, {
            mimeType,
          })
        : new MediaRecorder(stream);

      chunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const actualMimeType = recorder.mimeType || mimeType;

        console.log("Recorder Output:", actualMimeType);

        let extension = "webm";
        let fileType = "audio/webm";

        if (actualMimeType.includes("ogg")) {
          extension = "ogg";
          fileType = "audio/ogg";
        }

        const blob = new Blob(chunksRef.current, {
          type: fileType,
        });

        const file = new File([blob], `voice-${Date.now()}.${extension}`, {
          type: fileType,
        });

        console.log("Voice File:", {
          name: file.name,
          type: file.type,
          size: file.size,
        });

        onRecorded(file);

        streamRef.current?.getTracks().forEach((track) => track.stop());
      };

      recorder.start();

      mediaRecorderRef.current = recorder;

      setRecording(true);
    } catch (error) {
      console.error(error);

      alert("Microphone permission denied.");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();

    setRecording(false);
  };

  return (
    <button
      type="button"
      onClick={recording ? stopRecording : startRecording}
      className={`border rounded px-3 py-2 ${
        recording ? "bg-red-500 text-white" : ""
      }`}
      title={recording ? "Stop Recording" : "Record Voice Message"}
    >
      {recording ? "⏹️" : "🎤"}
    </button>
  );
}
