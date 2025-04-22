import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { motion } from 'framer-motion';
import { SendHorizonal } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      { role: 'user', content: input },
      { role: 'assistant', content: 'This is a response from Grok-like AI.' },
    ];

    setMessages(newMessages);
    setInput('');
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Grok AI Chat</h1>
      <Paper
        className="flex-1 overflow-y-auto mb-4 p-2 rounded-lg bg-zinc-900 border border-zinc-700"
        style={{
          backgroundColor: '#18181b',
          color: 'white',
          overflowY: 'auto',
        }}
      >
        <div className="space-y-4">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`p-3 rounded-xl max-w-xl whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'ml-auto bg-blue-600'
                  : 'mr-auto bg-zinc-800'
              }`}
            >
              {msg.content}
            </motion.div>
          ))}
        </div>
      </Paper>

      <div className="flex items-center gap-2">
        <TextField
          fullWidth
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask me anything..."
          sx={{
            input: { color: 'white' },
            fieldset: { borderColor: '#3f3f46' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#3f3f46',
              },
              '&:hover fieldset': {
                borderColor: '#52525b',
              },
            },
          }}
        />
        <Button
          onClick={sendMessage}
          variant="contained"
          sx={{ bgcolor: '#2563eb', '&:hover': { bgcolor: '#1d4ed8' } }}
        >
          <SendHorizonal className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
