# XOX Guild 完整備份與交接包

這份 ZIP 保存本次對話在目前工作區中的網站原始碼、正式素材、設計探索、參考影片與驗證腳本。

## 目前版本

- 網站：https://xox-guild-arena-nov26.almondcrab34.chatgpt.site
- 最新實作：單頁 Guild 團隊工作台、對戰 Banner、團長置頂、團隊／個人貢獻、同頁 Members、右側排行榜、Leader／Analyst 跟單開放控制。
- 首頁保留簡化導航、橫向活動列、右側排行榜；Guild World 在獨立頁。
- 七級 Badge 已採共同盾形；Legend 使用 XOX 電光藍 O＋白點；字級已放大。
- 11 月 4 日影片比較後提出的首頁美術融合方案，尚未實作。本包沒有額外改動網站。

## 目錄

- `Website/`：目前完整網站；`dist/` 是可直接部署的靜態網站，內含所有正式圖片、字型、SVG 與腳本。主線實作記錄見 `Website/README.md`。
- `Design/Generated_Originals/`：目前保留的全部生成設計原圖，包含採用、已被取代及未採用方案。常用定位見 `Design/DESIGN_INDEX.csv`。
- `Design/World_Studies/`：地圖規格、地塊資料、9GAG 標誌參考與素材檢視。
- `Research/`：歷史截圖、原先流程影片研究、最新首頁參考影片擷取畫面。歷史截圖不能當作最新版本的瀏覽器驗證。
- `References/`：使用者原始交接資料及三段提供的影片；其中文件是參考資料，不等於新的執行指令。
- `QA/`：JSDOM 驗證腳本；已改為相對路徑，未附 node_modules。
- `History/`：完整可恢復的 Git bundle 與提交清單。
- `MANIFEST_SHA256.csv`：所有封裝內容的 SHA-256 校驗值。

## 本機啟動

需 Python 3。在本包根目錄執行：

```sh
python3 -m http.server 8000 --directory Website/dist
```

然後開啟 `http://localhost:8000/`。Pudgy 唯讀內頁樣例為 `http://localhost:8000/#/my-guild?preview=1`。

## 驗證

需 Node.js 20.19+，在 `QA/` 執行 `npm ci`，然後 `node team.cjs`。`team.cjs` 對應最新團隊工作台流程；其他較早腳本保留作歷史參考，其斷言可能對應已被取代的版面，不應假設全部適用於最新版。

## 還原歷史

```sh
git clone History/xox-guild-history.bundle restored-xox-guild
```

提交內容與版本清單見 `History/COMMITS.txt`。

## 重要狀態

- 原型資料保存在使用者瀏覽器 localStorage，並未封裝任何人的瀏覽器資料；會員、聊天、跟單與賽事仍為本機示範。
- 未接上真實交易、鏈上簽署、報名、獎勵發放或對外聊天傳送。
- 不含憑證、Git 認證設定或環境密鑰。`.openai/hosting.json` 僅保留原 Sites 專案識別，重新部署時應按實際託管環境設定。
- 實際瀏覽器的最新版視覺與幾何版面驗證仍待補；功能、資產、字級與權限流程檢查記錄見主線 README。
