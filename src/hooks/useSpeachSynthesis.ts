import { useCallback,useState } from "react";


export const useSpeachSynthesis = () => {
  const [textLine, setTextLine] = useState<string>("");
  const[indexActive,setIndexActive]=useState(0);

  const [text, setText] = useState<string>("");
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isResumed, setIsResumed] = useState<boolean>(false);
  const [isEnded, setIsEnded] = useState<boolean>(false);

  
  const speak = useCallback(() => {
    var msg = new SpeechSynthesisUtterance();

    msg.text = <string>text;
    function speak() {
      window.speechSynthesis.speak(msg);
    }
    speak();
    setIsSpeaking(true);
    setIsEnded(false);
  }, [text]);

  const pause = useCallback(() => {
    function pause() {
      window.speechSynthesis.pause();
    }
    pause();
    setIsPaused(true);
    setIsSpeaking(false);
    setIsEnded(false);
    setIsResumed(false);
  }, []);

  const resume = useCallback(() => {
    function resume() {
      window.speechSynthesis.resume();
    }
    resume();
    setIsPaused(false);
    setIsSpeaking(false);
    setIsEnded(false);
    setIsResumed(true);
  }, []);

  const cancel = useCallback(() => {
    function cancel() {
      window.speechSynthesis.cancel();
    }
    cancel();
    setIsPaused(false);
    setIsResumed(false);

    setIsSpeaking(false);
    setIsEnded(true);
  }, []);
  const playInLine=useCallback(()=>{
    async function speakLine() {
     const sentences = textLine.split('#');  
      for (let i = 0; i < sentences.length; i++) {
        setIndexActive(i);
        await getNextAudio(sentences[i]);
      }
  
      async function getNextAudio(sentence:any) {
        console.log(sentence);
        let audio = new SpeechSynthesisUtterance(sentence);
        window.speechSynthesis.speak(audio);
  
        return new Promise(resolve => {
          audio.onend = resolve;
        });
      } 
    }
    speakLine();
    setIsSpeaking(true);
    setIsEnded(false);
  },[textLine]);

return {
    text,  
    setText,
    isSpeaking,
    isPaused,
    isResumed,
    isEnded,
    speak,
    pause,
    resume,
    cancel,
    playInLine,
    setTextLine,
    textLine,   
    indexActive,
}
}