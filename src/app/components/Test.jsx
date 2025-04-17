'use client';
import React, { useState, useEffect } from 'react';

// JSON ข้อมูลคำถาม (ใช้แทนการดึงจาก API)
const quizData = {
  questions: [
    { id: 1, text: '1+1 เท่ากับ?', options: ['1', '2', '3', '4'], correct: 1 },
    { id: 2, text: 'สีของท้องฟ้า?', options: ['แดง', 'น้ำเงิน', 'เขียว', 'เหลือง'], correct: 1 },
    { id: 3, text: 'ไทยมีกี่จังหวัด?', options: ['76', '77', '78', '79'], correct: 1 },
    { id: 4, text: 'ดาวเคราะห์ใกล้ดวงอาทิตย์?', options: ['โลก', 'อังคาร', 'พุธ', 'ศุกร์'], correct: 2 },
    { id: 5, text: '1 ปีมีกี่วัน?', options: ['365', '366', '364', '360'], correct: 0 },
  ]
};

// ตัวอย่าง endpoint สำหรับ POST คำตอบ (ว่างตามที่ขอ)
// const ANSWER_ENDPOINT = ''; 
// วิธีใช้ endpoint:
// 1. สร้าง backend API (เช่น Node.js, Express) ที่รับ POST request
// 2. กำหนด URL เช่น 'https://your-api.com/submit-answer'
// 3. ตัวอย่าง payload: { questionId: 1, selectedAnswer: 2, isCorrect: true }
// 4. Backend ควร return { success: true } หรือ error
// 5. แก้ const ANSWER_ENDPOINT = 'https://your-api.com/submit-answer';

const Test = () => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState(null);

  // จำลองการดึงข้อมูลจาก API (ใช้ JSON แทน)
  useEffect(() => {
    // ตัวอย่าง fetch ถ้าใช้ API จริง:
    // fetch('https://your-api.com/questions')
    //   .then(res => res.json())
    //   .then(data => setQuestions(data.questions));
    setQuestions(quizData.questions);
  }, []);

  const handleAnswer = async (index) => {
    setSelected(index);
    const isCorrect = index === questions[current].correct;
    if (isCorrect) setScore(score + 1);

    // ส่งคำตอบไป API (endpoint ว่าง)
    try {
      // const res = await fetch(ANSWER_ENDPOINT, {
      const res = await fetch('', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: questions[current].id,
          selectedAnswer: index,
          isCorrect
        })
      });
      // if (!res.ok) throw new Error('Failed to submit answer');
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  };

  const reset = () => {
    setCurrent(0);
    setScore(0);
    setShowResult(false);
    setSelected(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        {showResult ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">ผลลัพธ์</h2>
            <p className="text-lg mb-4">คะแนน: {score}/{questions.length}</p>
            <button
              onClick={reset}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              เริ่มใหม่
            </button>
          </div>
        ) : questions.length > 0 ? (
          <div>
            <h2 className="text-xl font-bold mb-4">
              ข้อ {current + 1}: {questions[current].text}
            </h2>
            <div className="space-y-2">
              {questions[current].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selected !== null}
                  className={`w-full text-left p-2 rounded ${
                    selected === index
                      ? index === questions[current].correct
                        ? 'bg-green-200'
                        : 'bg-red-200'
                      : 'bg-gray-200 hover:bg-gray-300'
                  } ${selected !== null ? 'cursor-not-allowed' : ''}`}
                >
                  {option}
                </button>
              ))}
            </div>
            {selected !== null && (
              <button
                onClick={handleNext}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                {current < questions.length - 1 ? 'ข้อถัดไป' : 'ดูผลลัพธ์'}
              </button>
            )}
          </div>
        ) : (
          <p className="text-center">กำลังโหลด...</p>
        )}
      </div>
    </div>
  );
};

export default Test;