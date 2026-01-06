## Local Hosting Guide (No EC2, No Terraform, No Ansible)

This project can run completely on your local machine without **any** cloud
infrastructure (no EC2, no Terraform, no Ansible, no Nagios).

All the AWS / DevOps files are kept for reference, but **you can ignore them**
for local development and local production-style hosting.

---

### 1. Prerequisites

- **Node.js 20+**
- **npm** (comes with Node)
- **MongoDB** running locally, or a connection string to any MongoDB instance
  - Example local connection: `mongodb://127.0.0.1:27017/digital_wardrobe`

---

### 2. Install Dependencies

From the project root:

```bash
npm install
```

---

### 3. Configure Environment (Database)

Create a `.env` file in the project root (same folder as `package.json`):

```bash
MONGODB_URI=mongodb://127.0.0.1:27017/digital_wardrobe
PORT=3000
NODE_ENV=development
```

You can use any MongoDB URI you like (Atlas, another server, etc.); this does
**not** require EC2 or any AWS services.

The custom server (`server.ts`) and PM2 config (`ecosystem.config.js`) both
respect the `MONGODB_URI` and `PORT` environment variables.

---

### 4. Run Frontend + Backend Locally (Development)

This will start the full Next.js app (frontend + API routes + Socket.IO)
on your local machine:

```bash
npm run dev
```

Then open:

- `http://localhost:3000`

No EC2, no Terraform, no Ansible are involved here.

---

### 5. Local "Production" Run (Without Cloud)

If you want to test a production-style build locally:

```bash
# Build the app
npm run build

# Start the custom Node.js server
npm start
```

This uses the same `server.ts` custom server that would run in production,
but it is hosted entirely on your own machine.

---

### 6. Optional: Use PM2 Locally (No EC2 Required)

If you want to keep the app running in the background on **your local machine**
you can (optionally) use PM2:

```bash
npm install -g pm2

# Make sure you have built the app first
npm run build

# Start using the generic ecosystem config (now machine-agnostic)
pm2 start ecosystem.config.js
pm2 save
```

The updated `ecosystem.config.js`:

- **Does not** assume `/home/ubuntu` or EC2
- Uses `process.cwd()` as the working directory
- Writes logs to a local `logs` folder in this project
- Defaults `MONGODB_URI` to a local MongoDB instance, but you can override with
  an environment variable

---

### 7. Which Files You Can Ignore for Local Hosting

For pure local hosting, you can ignore:

- `ansible/` (all playbooks and inventory files)
- `nagios/` (monitoring configs)
- `AWS_DEPLOYMENT_GUIDE.md`
- `CHECK_INSTANCES.md`
- `CHECK_STATUS.md`
- `DEPLOYMENT_TROUBLESHOOTING.md`
- `VERIFY_AND_FIX.md`

They remain in the repo (as requested) but are **not needed** to run the app on
your own machine.

---

You now have a full frontend + backend setup that runs locally with **no EC2**
and **no DevOps tooling** required.

