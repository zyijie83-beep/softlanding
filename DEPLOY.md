# SoftLanding 安落 — Netlify 部署指南

这份指南按“最快上线 → 表单能收信 → 以后再买域名”的顺序写。比赛/演示阶段，前两步就够，0 元。

---

## 0. 先确认文件

部署文件夹 `closewell/` 的根目录应该长这样：

```
index.html
styles.css
script.js
thank-you.html
privacy.html
404.html
netlify.toml
robots.txt
sitemap.xml
preview-hero.png
README.md
DEPLOY.md
```

`index.html` 必须直接在根目录，不能是 `closewell/closewell/index.html`。

表单已经写好 Netlify 需要的属性：

```html
<form name="contact" method="POST" action="/thank-you.html"
      data-netlify="true" netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="contact">
  ...
</form>
```

> Netlify Forms 只在**部署后的线上站点**生效。本地双击 `index.html` 或 `python -m http.server` 提交会失败，这是正常的。

---

## 1. 最快上线：Netlify Drop（约 3 分钟）

1. 打开 <https://app.netlify.com>，用邮箱或 GitHub 注册/登录。
2. 打开 <https://app.netlify.com/drop>。
3. 把 **`closewell` 这个文件夹本身**拖进虚线框（不是拖单个文件，也不是拖它的上一层目录）。
4. 等进度条走完，你会得到一个网址，类似：

   ```
   https://sparkling-pastry-1a2b3c.netlify.app
   ```

5. 打开这个网址，检查：
   - 首页能开；
   - 右上角 `EN / 中文` 能切换；
   - 手机上排版正常；
   - 提交一次表单，能跳到 `/thank-you.html`，或看到“谢谢你”。

6. 改一个更好记的免费子域名：
   - Netlify 控制台 → 你的站点 → **Site configuration** → **Site details** → **Change site name**；
   - 填 `softlanding`，如果被占用就试 `softlanding-cn`、`softlanding-care`；
   - 成功后网址变成 `https://softlanding.netlify.app`。

> 拖拽部署适合比赛和演示。以后每次改内容，都要重新拖一次文件夹。

---

## 2. 长期维护：GitHub + Netlify（推荐）

适合“以后还会改文案/加页面”的情况。

1. 在 GitHub 新建一个仓库，例如 `softlanding-site`。
2. 把 `closewell/` **里面的内容**上传到仓库根目录（不要多一层文件夹）。
3. Netlify 控制台 → **Add new site** → **Import an existing project** → **GitHub** → 选这个仓库。
4. 构建设置：
   - **Build command**：留空
   - **Publish directory**：`.`
5. 点 **Deploy site**。
6. 以后改完文件，`git push`，Netlify 会自动重新部署。

`netlify.toml` 已经写好 `publish = "."` 和基础安全响应头，Netlify 会自动读取。

---

## 3. 让表单真的发到你邮箱

部署完成后：

1. 打开线上站点，在联系表单里填一次测试（用你自己的邮箱/手机）。
2. 回到 Netlify 控制台 → 你的站点 → **Forms**。
3. 应该能看到一个叫 **contact** 的表单，里面有刚才的提交。
4. 点 **Form notifications**（或 Settings → Form notifications）→ **Add notification** → **Email notification**。
5. 收件人填 `care@你的域名` 或你的常用邮箱；保存。
6. 再提交一次，确认邮箱收到通知。

免费额度：Netlify 免费计划通常含 **100 份表单提交/月**，比赛和早期够用。垃圾提交方面：

- 表单里已经有 honeypot `bot-field`；
- Netlify 自带垃圾过滤；
- 如果以后垃圾多，再在 Forms 设置里开 reCAPTCHA。

### 表单没被识别？

按顺序检查：

- `form` 上有没有 `data-netlify="true"`；
- 有没有 `name="contact"`；
- 有没有 `<input type="hidden" name="form-name" value="contact">`；
- 表单是不是直接写在 `index.html` 里（不是 JS 动态插入的）；
- 改完有没有重新部署。

---

## 4. 买域名（可选，约 ¥100–300/年）

比赛/演示可以先跳过。真要上线再买。

1. 在 **Namecheap / Cloudflare Registrar / 阿里云 / 腾讯云** 买，别在来路不明的小站买。
2. 优先考虑：
   - `softlanding.co`
   - `softlanding.care`
   - `softlanding.cn`（需要实名）
   - 备选：`softlanding.studio`、`getsoftlanding.com`
3. 买之前先在注册商搜一遍，确认价格不是“premium”高价。
4. Netlify 控制台 → **Domain management** → **Add a domain** → 输入域名。
5. 按 Netlify 的提示做 DNS：
   - **最省事**：把域名的 nameserver 改成 Netlify DNS；
   - **不想改 nameserver**：在域名商处按 Netlify 给的记录加 A / CNAME。
6. 等 DNS 生效（几分钟到几小时），Netlify 会自动签发 HTTPS 证书。
7. 把 `robots.txt` 和 `sitemap.xml` 里的 `https://softlanding.co` 换成你的真实域名。
8. 如果域名不是 `.co`，把页面里的 `care@softlanding.co` 全部替换成真实邮箱。

---

## 5. 邮箱

`care@softlanding.co` 现在只是占位。上线前至少做到：

- 用 **Zoho Mail 免费版 / 飞书邮箱 / 阿里企业邮箱** 开一个域名邮箱；
- 或者先用一个真实可收信的邮箱，把页面里的 `care@softlanding.co` 全部替换掉；
- 在 Netlify 表单通知里填同一个邮箱。

---

## 6. 上线前检查清单

- [ ] 首页、`privacy.html`、`thank-you.html`、404 页面都能打开
- [ ] 右上角 `EN / 中文` 能切换，刷新后还记得
- [ ] 手机（390–430px）上没有横向滚动
- [ ] 表单提交后能到 `/thank-you.html`，Netlify Forms 里有记录
- [ ] 表单通知邮箱能收到信
- [ ] `care@` 邮箱是真实可收信的
- [ ] 隐私说明链接在表单下方和页脚都能点
- [ ] 页脚已写 “Not a licensed legal, funeral, or medical provider”；如果主体资质变化，按实际情况调整
- [ ] HTTPS 正常（Netlify 自动）
- [ ] `robots.txt` / `sitemap.xml` 里的域名已替换

---

## 7. 中国大陆访问的额外说明

Netlify 是海外托管：

- 不需要 ICP 备案；
- 但中国大陆访问速度可能不稳定，尤其是图片/字体多的站点（本站没有外部字体和图片，影响相对小）；
- 如果以后主要面向中国大陆用户，建议迁移到阿里云/腾讯云，并做 **ICP 备案 + 域名实名**；
- 不管用哪家，收集丧亲家庭信息都要有隐私说明，不要通过表单收身份证、死亡证明、银行账户等敏感材料。

---

## 8. 常见问题

| 现象 | 原因 | 处理 |
|---|---|---|
| 打开是 404 | 拖拽时多了一层文件夹 | 重新拖 `closewell` 文件夹本身，确保 `index.html` 在根目录 |
| 表单提交后没记录 | 表单没被识别 / 没重新部署 | 检查 `data-netlify`、`name`、`form-name`，重新部署 |
| 表单提交报错 | 本地打开，或 fetch 被拦截 | 在线上测试；看浏览器 Console/Network |
| 样式没更新 | 浏览器缓存 / 没重新部署 | 强制刷新；重新拖拽或 git push |
| 域名打不开 | DNS 没生效 | 等 1–24 小时；用 `dig` 查记录 |
| 邮箱收不到通知 | 通知没配 / 进了垃圾箱 | Netlify Forms 通知设置；查垃圾箱 |

---

## 9. 最短路径（懒人版）

1. 打开 <https://app.netlify.com/drop>；
2. 拖 `closewell` 文件夹；
3. 得到 `*.netlify.app`；
4. 线上提交一次表单；
5. Netlify → Forms → 加邮箱通知；
6. 结束。域名以后再说。
