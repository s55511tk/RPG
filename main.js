let plyName = prompt("名前を入力してください");
let flag = true;
//プレイヤーデータ
let plyLv = 1;
let plyHp = 5;
let plyHpMax = 5;
let plyAtt = 1;
let plyHeal = 1;
let plyExp = 0;
let plyExpNext = 5;
let plyExpNeed = 5;
let plyImg = document.getElementById("plyImg");
let p = [];
for (let i = 0; i < 7; ++i) {
  p.push(document.getElementById("plySt" + i));
}
plySt0.textContent = plyName;
//プレイヤー回復
plyImg.addEventListener("mousedown", () => {
  if (flag) {
    plyImg.src = "playerC.png";
  }
});
plyImg.addEventListener("mouseup", () => {
  if (flag) {
    plyImg.src = "playerA.png";
    plyHp += plyHeal;
    if (plyHp > plyHpMax) {
      plyHp = plyHpMax;
    }
    plySt2.textContent = "HP：" + plyHp;
  }
});
//敵データ
let eneName = [
  "スライム",
  "コウモリ",
  "ネズミ",
  "ヘビ",
  "オオカミ",
  "ゴブリン",
  "ゴースト",
  "ゾンビ",
  "不知火",
  "クマ",
];
let eneLv = 1;
let eneHp = 10;
let eneHpMax = [10, 20, 30, 50, 100, 150, 200, 250, 300, 500];
let eneAtt = [2, 3, 5, 7, 9, 12, 15, 20, 30, 50];
let eneKill = 0;
let eneExp = [1, 3, 5, 10, 20, 30, 40, 50, 70, 100];
let eneCnt = 5;
let eneCntMax = [5, 4, 4, 3, 3, 3, 3, 4, 4, 4];
let eneImg = document.getElementById("eneImg");
let e = [];
for (let j = 0; j < 5; ++j) {
  e.push(document.getElementById("eneSt" + j));
}
eneSt0.textContent = eneName[eneLv - 1];
//敵を攻撃
eneImg.addEventListener("mousedown", () => {
  if (flag) {
    eneImg.src = "enemyB" + (eneLv - 1) + ".png";
  }
});
eneImg.addEventListener("mouseup", () => {
  if (flag) {
    eneImg.src = "enemyA" + (eneLv - 1) + ".png";
    if (eneHp < plyAtt) {
      eneHp = 0;
    } else if (eneHp > 0) {
      eneHp -= plyAtt;
    }
    if (eneHp == 0) {
      eneHp = eneHpMax[eneLv - 1];
      eneKill++;
      eneSt4.textContent = "倒した回数：" + eneKill;
      //経験値の処理
      plyExp += eneExp[eneLv - 1];
      plySt5.textContent = "経験値：" + plyExp;
      plyExpNext -= eneExp[eneLv - 1];
      //レベルアップの処理
      if (plyExpNext <= 0) {
        plyLv++;
        let plyExpNeed0 = plyExpNeed;
        plyExpNeed = (plyLv + 1) * 5 + plyExpNeed0;
        plyExpNext = plyExpNeed - plyExp;
        plySt1.textContent = "レベル：" + plyLv;
        plyHpMax = plyLv * 5;
        plyHp = plyHpMax;
        plySt2.textContent = "HP：" + plyHp;
        plyAtt = (plyLv - 1) * 2;
        plySt3.textContent = "攻撃力：" + plyAtt;
        plyHeal++;
        plySt4.textContent = "回復魔法：" + plyHeal;
      }
      plySt6.textContent = "次のレベルまでの経験値　" + plyExpNext + "ポイント";
    }
    eneSt2.textContent = "HP：" + eneHp;
  }
});
//敵が時間ごとに攻撃
let eneSec = document.getElementById("eneSec");
let loop = setInterval(() => {
  if (eneKill == 100) {
    clearInterval(loop);
    flag = false;
    eneSec.textContent = "ゲームクリア";
  }
  if (eneCnt > 0) {
    eneCnt--;
    eneSec.textContent =
      "モンスターの攻撃まで" +
      eneCnt +
      "秒｜クリアまで" +
      (100 - eneKill) +
      "体";
  } else {
    plyImg.src = "playerB.png";
    plyHp -= eneAtt[eneLv - 1];
    if (plyHp > 0) {
      plySt2.textContent = "HP：" + plyHp;
      eneSec.textContent =
        "モンスターの攻撃まで" +
        eneCnt +
        "秒｜クリアまで" +
        (100 - eneKill) +
        "体";
    } else {
      plyHp = 0;
      clearInterval(loop);
      flag = false;
      plySt2.textContent = "HP：" + plyHp;
      eneSec.textContent = "ゲームオーバー";
    }
    setTimeout(() => {
      if (flag) {
        eneCnt = eneCntMax[eneLv - 1];
        plyImg.src = "playerA.png";
        eneSec.textContent =
          "モンスターの攻撃まで" +
          eneCnt +
          "秒｜クリアまで" +
          (100 - eneKill) +
          "体";
      }
    }, 500);
  }
}, 1000);
//モンスターの変更
let right = document.getElementById("right");
right.addEventListener("click", () => {
  eneLv++;
  eneSt0.textContent = eneName[eneLv - 1];
  eneImg.src = "enemyA" + (eneLv - 1) + ".png";
  eneHp = eneHpMax[eneLv - 1];
  eneHp.textContent = "HP：" + eneHpMax[eneLv - 1];
  eneAtt.textContent = "攻撃力：" + eneAtt[eneLv - 1];
  eneCnt = eneCntMax[eneLv - 1];
});
let left = document.getElementById("left");
left.addEventListener("click", () => {
  eneLv--;
  eneSt0.textContent = eneName[eneLv - 1];
  eneImg.src = "enemyA" + (eneLv - 1) + ".png";
  eneHp = eneHpMax[eneLv - 1];
  eneHp.textContent = "HP：" + eneHpMax[eneLv - 1];
  eneAtt.textContent = "攻撃力：" + eneAtt[eneLv - 1];
  eneCnt = eneCntMax[eneLv - 1];
});
