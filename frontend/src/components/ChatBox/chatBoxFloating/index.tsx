import { useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { motion, AnimatePresence } from 'framer-motion';
import { SendHorizonal, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  product?: {
    name: string;
    image: string;
    price: number;
    compareAt?: number;
    message?: string;
  };
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount);

const DEFAULT_SUGGESTIONS = [
  'Sản phẩm nào đang giảm giá?',
  'Có TV thông minh nào không?',
  'Tôi muốn mua màn hình 27 inch',
  'Tìm laptop dưới 20 triệu',
];

export default function ChatbotFloating() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  const typeWriter = (text: string, onComplete: () => void) => {
    let i = 0;
    setTypingText('');
    setIsTyping(true);
    function type() {
      if (i < text.length) {
        setTypingText((prev) => prev + text.charAt(i));
        i++;
        typingTimeout.current = setTimeout(type, 15);
      } else {
        setIsTyping(false);
        onComplete();
      }
    }
    type();
  };

  const fetchAnswer = async (question: string) => {
    try {
      const res = await fetch('http://localhost:8000/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();

      if (data.message) {
        await new Promise<void>((resolve) => {
          typeWriter(data.message, () => {
            setMessages((prev) => [
              ...prev,
              { role: 'assistant', content: data.message },
            ]);
            setTypingText('');
            resolve();
          });
        });
      }

      setIsTyping(true);
      await new Promise((r) => setTimeout(r, 2000));
      setIsTyping(false);

      if (Array.isArray(data.data)) {
        for (const item of data.data) {
          const { title, sku, price, imageUrl, compareAt } = item;
          let text = '';
          if (title && sku) {
            text += `${title} | ${sku}\n`;
          } else {
            if (title) text += `Tên sản phẩm: ${title}\n`;
            if (sku) text += `SKU: ${sku}\n`;
          }
          if (price !== null && price !== undefined) {
            text += `Giá: ${formatCurrency(price)}\n`;
          }

          await new Promise((r) => setTimeout(r, 400));

          setMessages((prev) => [
            ...prev,
            {
              role: 'assistant',
              content: text.trim(),
              product: imageUrl
                ? {
                    name: title || 'Sản phẩm',
                    image: imageUrl,
                    price: price || 0,
                    compareAt,
                  }
                : undefined,
            },
          ]);
        }
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `Lỗi: ${(error as Error).message}` },
      ]);
      setIsTyping(false);
    }
  };

  const sendMessage = (message?: string) => {
    const contentToSend = message ?? input;
    if (!contentToSend.trim()) return;

    const userMessage: Message = { role: 'user', content: contentToSend };
    setMessages((prev) => [...prev, userMessage]);
    fetchAnswer(contentToSend);
    setInput('');
    setShowSuggestions(false);
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-10 right-16 rounded-full shadow-2xl z-50 p-0 bg-transparent"
        aria-label="Open chat"
        style={{
          border: 'none',
          padding: 0,
          boxShadow: '0 0 8px 2px rgba(255, 165, 0, 0.8)',
          borderRadius: '9999px',
        }}
        animate={{
          rotate: [0, 15, -15, 15, -15, 0],
          scale: 1.15,
          boxShadow: [
            '0 0 8px 2px rgba(255, 165, 0, 0.8)',
            '0 0 15px 6px rgba(255, 165, 0, 1)',
            '0 0 8px 2px rgba(255, 165, 0, 0.8)',
          ],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
        }}
      >
        <img
          src="https://2.bp.blogspot.com/-Wb8LOyIz47g/Zk_2kBqy_lI/AAAAAABybXw/P3FAKItM9JIRASCGD3qkRDrqv56fe9OUgCNcBGAsYHQ/chibi_head.png?imgmax=3000"
          alt="Chat Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
      </motion.button>

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
            <div className="MuiBox-root css-na915g flex flex-col p-4 border-b border-zinc-200 rounded-t-2xl bg-gradient-to-r from-orange-100 to-blue-100">
              <div className="MuiBox-root css-k008qs flex justify-between items-center mb-3">
                <div className="MuiTypography-root MuiTypography-body1 css-vcv87t font-semibold text-lg">
                  Chat với trợ lý ảo
                </div>
                <div className="MuiBox-root css-0">
                  <button
                    className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall css-v8rxaa p-1 rounded-full hover:bg-zinc-200"
                    tabIndex={0}
                    type="button"
                    aria-label="minimize"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-11fo197 w-5 h-5" />
                    <span className="MuiTouchRipple-root css-w0pj6f"></span>
                  </button>
                </div>
              </div>

              <div className="MuiBox-root css-d8blkr flex items-center gap-3">
                <div className="MuiBox-root css-0">
                  <img
                    className="MuiBox-root css-smwrjt w-12 h-12 rounded-full"
                    src="https://2.bp.blogspot.com/-Wb8LOyIz47g/Zk_2kBqy_lI/AAAAAABybXw/P3FAKItM9JIRASCGD3qkRDrqv56fe9OUgCNcBGAsYHQ/chibi_head.png?imgmax=3000"
                    alt="Avatar nhân viên tư vấn"
                  />
                </div>
                <div className="MuiBox-root css-suglgs flex flex-col">
                  <div className="MuiBox-root css-yo3zrc text-sm font-medium text-gray-700">
                    Em ở đây để hỗ trợ cho mình ạ
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-white">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`rounded-xl px-4 py-2 max-w-[80%] ${
                      msg.role === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-black'
                    }`}
                  >
                    <pre className="whitespace-pre-wrap text-sm italic">
                      {msg.content}
                    </pre>

                    {msg.product && (
                      <Link
                        to={`/product/details`}
                        className="mt-2 space-y-1 block cursor-pointer hover:bg-gray-200 rounded-md p-2"
                      >
                        <img
                          src={msg.product.image}
                          alt={msg.product.name}
                          className="w-32 rounded-md shadow-md"
                        />
                        <p className="text-base font-bold text-gray-800">
                          {msg.product.name}
                        </p>
                        <div className="text-sm text-gray-600 flex gap-2 items-center">
                          <span className="font-bold text-black">
                            {formatCurrency(msg.product.price)}
                          </span>
                          {msg.product.compareAt &&
                            msg.product.compareAt > msg.product.price && (
                              <span className="line-through text-red-500 text-xs">
                                {formatCurrency(msg.product.compareAt)}
                              </span>
                            )}
                        </div>
                        {msg.product.message && (
                          <p className="text-xs text-green-600">
                            {msg.product.message}
                          </p>
                        )}
                      </Link>
                    )}
                  </div>
                </div>
              ))}

              {typingText && (
                <div className="flex justify-start">
                  <div className="rounded-xl px-4 py-2 max-w-[80%] bg-gray-100 text-black text-sm whitespace-pre-wrap">
                    {typingText}
                  </div>
                </div>
              )}

              {isTyping && !typingText && (
                <div className="flex justify-start flex-col space-y-2 max-w-[80%]">
                  <div className="h-4 w-full bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-4 w-4/5 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-4 w-3/4 bg-gray-300 rounded animate-pulse"></div>
                </div>
              )}
            </div>

            {showSuggestions && !isTyping && (
              <div className="flex flex-col gap-2 p-3 border-t border-zinc-200 bg-gray-50">
                {DEFAULT_SUGGESTIONS.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => sendMessage(suggestion)}
                    className="text-sm text-left bg-white px-3 italic py-2 rounded-md border border-gray-300 shadow-sm hover:bg-gray-100 transition"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {/* Input box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!isTyping) sendMessage();
              }}
              className="flex items-center gap-2 p-3 border-t border-zinc-200"
            >
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Nhập câu hỏi..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (!isTyping) sendMessage();
                  }
                }}
                disabled={isTyping}
              />

              <IconButton
                color="primary"
                onClick={() => {
                  if (!isTyping) sendMessage();
                }}
                aria-label="Send message"
                disabled={isTyping || !input.trim()}
              >
                <SendHorizonal />
              </IconButton>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
