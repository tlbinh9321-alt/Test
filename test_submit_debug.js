async function testPublicSubmit() {
  const url = 'http://127.0.0.1:5005/api/submissions/public';
  
  // Tạo FormData giả lập
  const formData = new URLSearchParams();
  formData.append('name', 'Test User');
  formData.append('email', 'test@example.com');
  formData.append('memoryTitle', 'Test Title');
  formData.append('content', 'Test Content');
  // Không gửi file để test nhanh

  try {
    const res = await fetch(url, {
      method: 'POST',
      body: formData, // URLSearchParams will be sent as application/x-www-form-urlencoded
    });
    const text = await res.text();
    console.log('Status:', res.status);
    console.log('Body:', text);
  } catch (err) {
    console.error('Fetch Error:', err);
  }
}

testPublicSubmit();
