document.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.getElementById("send-btn");
  const userInput = document.getElementById("user-input");
  const chatThread = document.getElementById("chat-thread");

  const diseaseData = {
  pneumonia: {
    symptoms: "Bukhar, khaansi, seene mein dard, saans lene mein dikkat, thakaan.",
    prevention: "Vaccination, haath dhona, dhool-dhue se bachna.",
    caution: "Zyada bukhar ya saans ki dikkat ho toh turant doctor se milo."
  },
  influenza: {
    symptoms: "Bukhar, thand lagna, sharir dard, gale mein kharash, naak behna.",
    prevention: "Flu vaccine, haath dhona, bheed se bachna.",
    caution: "Bachchon aur buzurgon mein zyada khatarnaak ho sakta hai."
  },
  polio: {
    symptoms: "Bukhar, gale mein dard, sir dard, ulti, gardan mein akad, lakva.",
    prevention: "Polio drops (OPV/IPV), safai ka dhyan.",
    caution: "Lakva hone par turant hospital le jao."
  },
  covid: {
    symptoms: "Bukhar, sukhkha khaansi, taste/smell ka loss, thakaan, saans ki dikkat.",
    prevention: "Mask pehno, vaccine lo, bheed se bachna.",
    caution: "Saans lene mein dikkat ho toh oxygen support zaroori ho sakta hai."
  },
  diarrhea: {
    symptoms: "Patli potty, pet dard, ulti, pani ki kami.",
    prevention: "Saaf paani, haath dhona, khana dhang se pakana.",
    caution: "Bachchon mein dehydration jaldi hota hai — ORS zaroori hai."
  },
  tuberculosis: {
    symptoms: "Lambi khaansi, wajan kam hona, raat mein paseena, bukhar, seene mein dard.",
    prevention: "BCG vaccine, khaansi etiquette, TB patient se doori.",
    caution: "Lambi khaansi ho toh test karwana zaroori hai."
  },
  malnutrition: {
    symptoms: "Thakaan, wajan kam hona, vikas mein rukawat, immunity kam.",
    prevention: "Poshan yukt bhojan, iron/calcium rich diet.",
    caution: "Bachchon mein growth delay ho toh nutrition check karwana chahiye."
  },
  measles: {
    symptoms: "Bukhar, khaansi, naak behna, aankhon mein laalpan, chehre se rash shuru.",
    prevention: "MMR vaccine, safai ka dhyan.",
    caution: "Rash ke saath bukhar ho toh turant doctor se milo."
  },
  cholera: {
    symptoms: "Pani jaisi potty, ulti, pairon mein cramps, pani ki kami.",
    prevention: "Saaf paani, hygiene, khana dhang se pakana.",
    caution: "Dehydration se shock ho sakta hai — ORS aur IV zaroori ho sakta hai."
  },
  hepatitis: {
    symptoms: "Thakaan, peeli aankh/skin, pet dard, kaala moot, ulti.",
    prevention: "Hepatitis vaccine, safe food & water.",
    caution: "Jaundice ke lakshan ho toh liver test karwana chahiye."
  },
  typhoid: {
    symptoms: "Tez bukhar, kamzori, pet dard, sir dard, bhukh na lagna.",
    prevention: "Saaf paani, hygiene, typhoid vaccine.",
    caution: "Bukhar 3 din se zyada ho toh blood test karwana chahiye."
  },
  cancer: {
    symptoms: "Wajan kam hona, thakaan, ganth, lagatar dard ya bleeding.",
    prevention: "Regular screening, healthy lifestyle, tobacco se doori.",
    caution: "Ganth ya bleeding ho toh delay na karo — test zaroori hai."
  },
  "heart attack": {
    symptoms: "Seene mein dard, saans ki kami, paseena, ulti, chakkar.",
    prevention: "Healthy diet, exercise, stress kam karo.",
    caution: "Seene mein dard ho toh ambulance bulao — time critical hai."
  },
  diabetes: {
    symptoms: "Bar-bar mootna, zyada pyaas lagna, thakaan, dhundhla dikhna, ghaav der se bharna.",
    prevention: "Healthy diet, weight control, regular checkup.",
    caution: "Sugar level monitor karo — insulin ya medicine zaroori ho sakti hai."
  }
};


  const scrollToBottom = () => {
    chatThread.scrollTop = chatThread.scrollHeight;
  };

  const createMessage = (text, sender) => {
    const msg = document.createElement("div");
    msg.className = `message ${sender}`;

    const bubble = document.createElement("p");
    bubble.textContent = text;

    const time = document.createElement("span");
    time.className = "time";
    time.textContent = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });

    msg.appendChild(bubble);
    msg.appendChild(time);
    chatThread.appendChild(msg);
    scrollToBottom();
  };

  const botReply = (userText) => {
  const typing = document.createElement("div");
  typing.className = "message bot typing";
  typing.innerHTML = `<p>...</p>`;
  chatThread.appendChild(typing);
  scrollToBottom();

  setTimeout(() => {
    typing.remove();
    const lowerText = userText.toLowerCase();
    let reply = "Main aapki madad ke liye hoon. Aap kisi bhi bimari ke symptoms, prevention aur caution poochh sakte ho.";

    const matchedDisease = Object.keys(diseaseData).find(disease =>
      lowerText.includes(disease)
    );

    if (matchedDisease) {
      const info = diseaseData[matchedDisease];
      reply = `🩺 *${matchedDisease.toUpperCase()}*\n\n` +
              `1️⃣ **Symptoms:**\n${info.symptoms}\n\n` +
              `2️⃣ **Prevention:**\n${info.prevention}\n\n` +
              `3️⃣ **Caution:**\n${info.caution}`;
    }

    createMessage(reply, "bot");
  }, 1200);
};




  const sendMessage = () => {
    const text = userInput.value.trim();
    if (text !== "") {
      createMessage(text, "user");
      botReply(text);
      userInput.value = "";
    }
  };

  sendBtn.addEventListener("click", sendMessage);
  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });
});
