// random Data 50개
const randomData = () =>{
    const data = Array.from({ length: 50 }, () =>
      Math.floor(Math.random() * 100)
    );

    return data;
}

// random text data 30글자 50개 
const randomText = () => {
  const labelText =
  Array.from({ length: 50 }, () => {
    let text = "";
    for (let i = 0; i < 30; i++) {
      // 글자 수
      text += String.fromCharCode(65 + Math.floor(Math.random() * 26));
    }
    return text;
  });

  return labelText;
}

export {randomData, randomText};