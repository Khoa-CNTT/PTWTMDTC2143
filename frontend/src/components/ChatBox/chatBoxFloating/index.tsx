import { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { motion, AnimatePresence } from 'framer-motion';
import { SendHorizonal, MessageCircle, X } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatbotFloating() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // const sendMessage = () => {
  //   if (!input.trim()) return;

  //   const newMessages: Message[] = [
  //     ...messages,
  //     { role: 'user', content: input },
  //     { role: 'assistant', content: 'This is a response from Grok-like AI.' },
  //   ];

  //   setMessages(newMessages);
  //   setInput('');
  // };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const res = await fetch('http://localhost:3000/openai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response || 'No response from AI.',
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Failed to fetch AI response:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '⚠️ Error contacting AI service.' },
      ]);
    }
  };

  return (
    <>
      {/* Floating toggle button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 bg-orange-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg z-50"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            // Changed width and background color here
            className="fixed bottom-5 right-4 w-[28rem] max-h-[80vh] bg-orange-100 text-black rounded-xl shadow-lg border border-zinc-700 flex flex-col z-40"
          >
            <div className="flex justify-between items-center p-4 text-lg font-semibold border-b border-zinc-700">
              <span>How can I help you today?</span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-black hover:text-zinc-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Adjusted message container background if needed */}
            <Box
              sx={{
                flex: 1,
                overflowY: 'auto',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}
            >
              {messages.map((msg, i) => (
                <Box
                  key={i}
                  sx={{
                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    bgcolor: msg.role === 'user' ? 'primary.main' : '#fcd9a0', // Lighter assistant background
                    color: msg.role === 'user' ? 'white' : 'black',
                    p: 1.5,
                    borderRadius: 2,
                    maxWidth: '75%',
                    fontSize: '0.875rem',
                  }}
                >
                  {msg.content}
                </Box>
              ))}
            </Box>

            <Paper
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              // Adjusted input container background color
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1,
                borderTop: '1px solid #3f3f46',
                bgcolor: '#ffe4c4',
              }}
            >
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                placeholder="Ask anything"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                InputProps={{
                  sx: {
                    bgcolor: 'white',
                    input: { color: 'black' },
                    borderRadius: 1,
                  },
                }}
              />
              <IconButton
                onClick={sendMessage}
                sx={{
                  color: 'white',
                  ml: 1,
                  bgcolor: '#2563eb',
                  '&:hover': { bgcolor: '#1d4ed8' },
                }}
              >
                <SendHorizonal className="w-5 h-5" />
              </IconButton>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
