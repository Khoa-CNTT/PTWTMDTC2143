import { useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { motion, AnimatePresence } from 'framer-motion';
import { SendHorizonal, MessageCircle, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  product?: {
    name: string;
    image: string;
    price: number;
    salePrice?: number;
    message?: string;
  };
}

export default function ChatbotFloating() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [typingText, setTypingText] = useState('');
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: '',
          product: {
            name: 'ASUS ROG Flow Z13 (2023) Gaming Laptop Tablet',
            image:
              'https://m.media-amazon.com/images/I/71L2iBSyyOL._AC_SL1500_.jpg',
            price: 1200,
            salePrice: 999,
            message: 'Special offer for you!',
          },
        },
      ]);
      setTimeout(() => {
        startTypingEffect(
          'Bạn có muốn xem thêm thông tin chi tiết về sản phẩm này không?'
        );
      }, 800);
    }, 500);
  };

  const startTypingEffect = (fullText: string) => {
    setTypingText('');
    let i = 0;
    const type = () => {
      setTypingText((prev) => prev + fullText[i]);
      i++;
      if (i < fullText.length) {
        typingTimeout.current = setTimeout(type, 25);
      } else {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { role: 'assistant', content: fullText },
          ]);
          setTypingText('');
        }, 200);
      }
    };
    type();
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 bg-gradient-to-tr from-orange-500 to-blue-600 hover:from-blue-700 hover:to-orange-600 text-white p-3 rounded-full shadow-2xl z-50 transition-all duration-200"
        >
          <MessageCircle className="w-7 h-7" />
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 w-[26rem] max-h-[80vh] bg-white text-black rounded-2xl shadow-2xl border border-zinc-200 flex flex-col z-50"
            style={{
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.25)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <div className="flex justify-between items-center p-4 text-lg font-semibold border-b border-zinc-200 bg-gradient-to-r from-orange-100 to-blue-100 rounded-t-2xl">
              <span className="flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-orange-500" />
                How can I help you today?
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-500 hover:text-red-500 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <Box
              sx={{
                flex: 1,
                overflowY: 'auto',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
                background: 'linear-gradient(135deg, #fff7ed 0%, #e0e7ff 100%)',
              }}
            >
              {messages.length === 0 && (
                <div className="text-center text-gray-400 mt-10 mb-10">
                  <span>Start a conversation...</span>
                </div>
              )}

              {messages.map((msg, i) =>
                msg.product ? (
                  <Box
                    key={i}
                    sx={{
                      alignSelf: 'flex-start',
                      background: 'linear-gradient(135deg, #fff7ed, #e0f2fe)',
                      color: '#1e293b',
                      p: 2,
                      borderRadius: 3,
                      maxWidth: '85%',
                      boxShadow: '0 4px 12px rgba(251, 146, 60, 0.15)',
                      display: 'flex',
                      gap: 2,
                      alignItems: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #fef3c7, #dbeafe)',
                        boxShadow: '0 6px 16px rgba(251, 146, 60, 0.25)',
                        transform: 'translateY(-2px)',
                      },
                    }}
                    onClick={() => navigate('/product-detail')}
                  >
                    <img
                      src={msg.product.image}
                      alt="product"
                      className="w-16 h-16 object-contain rounded"
                    />
                    <div>
                      <div className="font-semibold text-base text-blue-800 mb-1">
                        {msg.product.name}
                      </div>
                      {msg.product.message && (
                        <div className="mb-1 text-sm italic text-slate-600">
                          {msg.product.message}
                        </div>
                      )}
                      <div className="text-lg font-bold text-red-600">
                        $
                        {msg.product.salePrice
                          ? msg.product.salePrice
                          : msg.product.price}
                        {msg.product.salePrice && (
                          <span className="text-sm text-gray-400 line-through ml-2">
                            ${msg.product.price}
                          </span>
                        )}
                      </div>
                    </div>
                  </Box>
                ) : (
                  <Box
                    key={i}
                    sx={{
                      alignSelf:
                        msg.role === 'user' ? 'flex-end' : 'flex-start',
                      bgcolor: msg.role === 'user' ? 'primary.main' : '#f1f5f9',
                      color: msg.role === 'user' ? 'white' : '#1e293b',
                      p: 1.5,
                      borderRadius: 2,
                      maxWidth: '75%',
                      fontSize: '0.97rem',
                      boxShadow:
                        msg.role === 'user'
                          ? '0 2px 8px 0 rgba(37,99,235,0.08)'
                          : '0 2px 8px 0 rgba(251,146,60,0.08)',
                    }}
                  >
                    {msg.content}
                  </Box>
                )
              )}

              {typingText && (
                <Box
                  sx={{
                    alignSelf: 'flex-start',
                    bgcolor: '#f1f5f9',
                    color: '#1e293b',
                    p: 1.5,
                    borderRadius: 2,
                    maxWidth: '75%',
                    fontSize: '0.97rem',
                    fontStyle: 'italic',
                    opacity: 0.9,
                  }}
                >
                  {typingText}
                </Box>
              )}
            </Box>

            <Paper
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1.5,
                borderTop: '1px solid #e5e7eb',
                bgcolor: '#f8fafc',
                borderBottomLeftRadius: 16,
                borderBottomRightRadius: 16,
              }}
              elevation={0}
            >
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                InputProps={{
                  sx: {
                    bgcolor: 'white',
                    input: { color: '#1e293b' },
                    borderRadius: 2,
                    fontSize: '1rem',
                  },
                }}
              />
              <IconButton
                onClick={sendMessage}
                sx={{
                  color: 'white',
                  ml: 1,
                  bgcolor: 'linear-gradient(135deg, #fb923c 0%, #2563eb 100%)',
                  background:
                    'linear-gradient(135deg, #fb923c 0%, #2563eb 100%)',
                  '&:hover': {
                    bgcolor:
                      'linear-gradient(135deg, #2563eb 0%, #fb923c 100%)',
                    background:
                      'linear-gradient(135deg, #2563eb 0%, #fb923c 100%)',
                  },
                  borderRadius: 2,
                  boxShadow: '0 2px 8px 0 rgba(37,99,235,0.15)',
                  transition: 'all 0.2s',
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
