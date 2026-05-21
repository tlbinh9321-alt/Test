/**
 * Controller xử lý các yêu cầu gọi AI trực tiếp
 */

exports.checkContent = async (req, res) => {
  try {
    const { content, prompt_type } = req.body;

    if (!content) {
      return res.status(400).json({ message: 'Thiếu nội dung cần kiểm tra.' });
    }

    // Tùy chỉnh prompt dựa trên loại yêu cầu (mặc định là kiểm duyệt lịch sử)
    let systemPrompt = "Bạn là chuyên gia sử học Việt Nam.";
    if (prompt_type === 'moderation') {
      systemPrompt = `
        Bạn là chuyên gia kiểm duyệt nội dung lịch sử. 
        Hãy kiểm tra tính xác thực và ngôn từ của nội dung sau.
        Trả về kết quả dưới định dạng JSON: 
        { "isClean": boolean, "score": number, "reason": string }
      `;
    }

    const aiRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "google/gemini-2.0-flash-001",
        "messages": [
          { "role": "system", "content": systemPrompt },
          { "role": "user", "content": content }
        ]
      })
    });

    const data = await aiRes.json();

    if (data.error) {
      return res.status(500).json({ error: data.error });
    }

    // Trả về nội dung AI phản hồi
    res.status(200).json({
      result: data.choices[0].message.content,
      usage: data.usage
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
