// بيانات العالم - يمكنك إضافة غرف هنا لتوسيع عالمك
const world = {
    "start": {
        title: "حافة الغابة",
        text: "تجد نفسك في طريق ترابي وسط أشجار كثيفة. الضوء يتسلل من بين الأغصان. هناك ممر ضيق يتجه نحو الظلام.",
        options: [
            { text: "التقدم نحو الممر المظلم", nextRoom: "deep_forest" },
            { text: "البحث عن موارد في الأعشاب", nextRoom: "search_grass" }
        ]
    },
    "deep_forest": {
        title: "أعماق الغابة",
        text: "الأشجار هنا ضخمة جداً. فجأة، سمعت غصناً ينكسر خلفك! ماذا ستفعل؟",
        options: [
            { text: "الاختباء خلف شجرة", nextRoom: "hide" },
            { text: "الجري للأمام", nextRoom: "run" },
            { text: "العودة للخلف", nextRoom: "start" }
        ]
    },
    "search_grass": {
        title: "بين الأعشاب",
        text: "وجدت خنجراً قديماً صدئاً! ربما سيفيدك لاحقاً.",
        options: [
            { text: "العودة للطريق", nextRoom: "start" }
        ]
    },
    "hide": {
        title: "منطقة الأمان",
        text: "مرّ حيوان غريب بجانبك ولم يراك. لقد نجوت هذه المرة.",
        options: [
            { text: "متابعة الاستكشاف", nextRoom: "start" }
        ]
    }
};

// وظيفة لتحديث محتوى اللعبة على الشاشة
function updateRoom(roomKey) {
    const room = world[roomKey];
    
    // تحديث العناوين والنصوص
    document.getElementById("location-title").innerText = room.title;
    document.getElementById("description").innerText = room.text;
    
    // مسح الأزرار القديمة وإنشاء الجديدة
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = ""; 

    room.options.forEach(option => {
        const btn = document.createElement("button");
        btn.innerText = option.text;
        btn.onclick = () => {
            // إضافة تأثير بسيط عند الانتقال
            document.getElementById("game-container").style.opacity = 0;
            setTimeout(() => {
                updateRoom(option.nextRoom);
                document.getElementById("game-container").style.opacity = 1;
            }, 200);
        };
        optionsDiv.appendChild(btn);
    });
}

// بدء اللعبة من أول غرفة
updateRoom("start");

