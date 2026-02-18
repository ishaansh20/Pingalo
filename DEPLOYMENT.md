# Pingalo - Deployment Guide for Render

This guide will walk you through deploying the Pingalo URL shortener on Render with MongoDB Atlas.

## Architecture Overview

- **Frontend**: React + Vite (Static Site)
- **Backend**: Node.js + Express API (Web Service)
- **Database**: MongoDB Atlas (Cloud Database)

---

## Prerequisites

1. GitHub account with the Pingalo repository
2. [Render account](https://render.com) (free tier available)
3. [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas) (free tier available)

---

## Step 1: Setup MongoDB Atlas

### 1.1 Create MongoDB Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign in or create a free account
3. Click **"Build a Database"**
4. Choose **"M0 FREE"** tier
5. Select your preferred cloud provider and region (closest to your Render region)
6. Name your cluster (e.g., `PingaloCluster`)
7. Click **"Create"**

### 1.2 Configure Database Access

1. In MongoDB Atlas, go to **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Set username (e.g., `pingalo-admin`)
5. Click **"Autogenerate Secure Password"** and **save it securely**
6. Set user privileges to **"Read and write to any database"**
7. Click **"Add User"**

### 1.3 Configure Network Access

1. Go to **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for Render deployment)
   - This adds `0.0.0.0/0` - required for Render
4. Click **"Confirm"**

### 1.4 Get Connection String

1. Go to **"Database"** (left sidebar)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<username>` and `<password>` with your actual credentials
6. Add database name after `.net/`: `mongodb+srv://...mongodb.net/pingalo?retryWrites=true&w=majority`

---

## Step 2: Deploy Backend on Render

### 2.1 Create Web Service

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub account if not already connected
4. Select the **`Pingalo`** repository

### 2.2 Configure Backend Service

Fill in the following settings:

| Setting            | Value                              |
| ------------------ | ---------------------------------- |
| **Name**           | `pingalo-backend` (or your choice) |
| **Region**         | Choose closest to you              |
| **Branch**         | `main`                             |
| **Root Directory** | `server`                           |
| **Runtime**        | `Node`                             |
| **Build Command**  | `npm install`                      |
| **Start Command**  | `node src/server.js`               |
| **Instance Type**  | `Free`                             |

### 2.3 Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** and add:

| Key            | Value                                                            |
| -------------- | ---------------------------------------------------------------- |
| `NODE_ENV`     | `production`                                                     |
| `PORT`         | `5000`                                                           |
| `MONGO_URI`    | Your MongoDB connection string from Step 1.4                     |
| `JWT_SECRET`   | Generate a random string (e.g., use: `openssl rand -base64 32`)  |
| `FRONTEND_URL` | `https://pingalo.onrender.com` (update after deploying frontend) |

**To generate JWT_SECRET** (run in terminal):

```bash
openssl rand -base64 32
```

### 2.4 Deploy

1. Click **"Create Web Service"**
2. Wait for deployment to complete (3-5 minutes)
3. Once deployed, copy the backend URL (e.g., `https://pingalo-backend.onrender.com`)

---

## Step 3: Deploy Frontend on Render

### 3.1 Create Static Site

1. In Render Dashboard, click **"New +"** → **"Static Site"**
2. Select the **`Pingalo`** repository

### 3.2 Configure Frontend Service

Fill in the following settings:

| Setting               | Value                                   |
| --------------------- | --------------------------------------- |
| **Name**              | `pingalo` (or your choice)              |
| **Region**            | Choose closest to you (same as backend) |
| **Branch**            | `main`                                  |
| **Root Directory**    | `client`                                |
| **Build Command**     | `npm install && npm run build`          |
| **Publish Directory** | `dist`                                  |

### 3.3 Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** and add:

| Key                | Value                                                                         |
| ------------------ | ----------------------------------------------------------------------------- |
| `VITE_BACKEND_URL` | Your backend URL from Step 2.4 (e.g., `https://pingalo-backend.onrender.com`) |

### 3.4 Deploy

1. Click **"Create Static Site"**
2. Wait for deployment to complete (3-5 minutes)
3. Once deployed, you'll get your frontend URL (e.g., `https://pingalo.onrender.com`)

---

## Step 4: Update Backend Environment

1. Go back to your backend service in Render
2. Go to **"Environment"** tab
3. Update `FRONTEND_URL` to your actual frontend URL from Step 3.4
4. Click **"Save Changes"**
5. Backend will automatically redeploy

---

## Step 5: Configure Custom Domain (Optional)

### 5.1 For Frontend

1. In your frontend static site, go to **"Settings"** → **"Custom Domain"**
2. Click **"Add Custom Domain"**
3. Enter your domain (e.g., `pingalo.com`)
4. Follow Render's DNS configuration instructions
5. Update DNS records at your domain registrar

### 5.2 For Backend

1. In your backend web service, go to **"Settings"** → **"Custom Domain"**
2. Add your API subdomain (e.g., `api.pingalo.com`)
3. Update DNS records
4. Update `VITE_BACKEND_URL` in frontend environment variables

---

## Step 6: Verify Deployment

1. Visit your frontend URL (e.g., `https://pingalo.onrender.com`)
2. Test the following:
   - ✅ Landing page loads correctly
   - ✅ Register a new account
   - ✅ Login with credentials
   - ✅ Create a short URL
   - ✅ Click the short URL and verify redirect
   - ✅ View analytics for a short URL
   - ✅ Check QR code generation
   - ✅ Delete a short URL

---

## Important Notes

### Free Tier Limitations

- **Render Free Tier**: Services spin down after 15 minutes of inactivity
  - First request after inactivity may take 30-60 seconds (cold start)
- **MongoDB Atlas Free Tier**: 512MB storage limit
- **Render Free Tier**: 750 hours/month (sufficient for hobby projects)

### Performance Optimization

To reduce cold start times:

1. Upgrade to Render paid plan ($7/month)
2. Use a service like UptimeRobot to ping your backend every 10 minutes

### CORS Configuration

The backend is configured to accept requests from `FRONTEND_URL`. Ensure:

- `FRONTEND_URL` in backend matches your frontend URL exactly
- No trailing slashes in URLs

### Environment Variables Security

Never commit `.env` files to GitHub. The `.gitignore` already excludes them.

---

## Troubleshooting

### Backend Not Starting

**Check Deploy Logs:**

1. Go to backend service → **"Logs"** tab
2. Look for errors in the startup sequence

**Common Issues:**

- Missing environment variables
- Invalid MongoDB connection string
- Port configuration (ensure PORT=5000)

### Frontend Not Connecting to Backend

**Check Browser Console:**

1. Open DevTools (F12) → Console tab
2. Look for CORS errors or network errors

**Solutions:**

- Verify `VITE_BACKEND_URL` is set correctly
- Ensure backend `FRONTEND_URL` matches your frontend URL
- Check if backend is running (visit backend URL directly)

### MongoDB Connection Failed

**Solutions:**

- Verify MongoDB connection string is correct
- Check MongoDB user password (no special characters in URL)
- Ensure Network Access allows `0.0.0.0/0`
- Check MongoDB cluster is running

### Short URLs Not Working

**Issue:** Redirect route not found

**Solution:**
The redirect route is `/:shortCode` at the backend. Ensure:

- Backend is deployed correctly
- Short URLs use the backend URL (e.g., `https://pingalo-backend.onrender.com/abc123`)

---

## Updating Your Deployment

### After Code Changes

1. **Commit and push to GitHub:**

   ```bash
   git add .
   git commit -m "Your update message"
   git push origin main
   ```

2. **Automatic Deployment:**
   - Render automatically detects GitHub pushes
   - Both frontend and backend will redeploy automatically
   - Check **"Events"** tab to monitor deployment

### Manual Redeploy

1. Go to your service in Render
2. Click **"Manual Deploy"** → **"Deploy latest commit"**

---

## Cost Estimation

### Free Tier (Recommended for Testing)

- MongoDB Atlas: Free (M0 cluster)
- Render Backend: Free (750 hours/month)
- Render Frontend: Free (100GB bandwidth/month)
- **Total: $0/month**

### Production Tier (Recommended for Real Use)

- MongoDB Atlas: $9/month (M10 cluster)
- Render Backend: $7/month (Starter plan)
- Render Frontend: Free or $7/month (for custom domain)
- **Total: ~$16-23/month**

---

## Monitoring & Maintenance

### Health Checks

Render provides built-in health monitoring:

1. Go to service → **"Settings"** → **"Health & Alerts"**
2. Add health check path: `/api/health` (if you implement it)
3. Set up email notifications

### Logs

Access logs anytime:

1. Go to service → **"Logs"** tab
2. View real-time logs
3. Filter by log level or search

### Backups (MongoDB)

MongoDB Atlas automatically backs up your data:

1. Go to Atlas → Cluster → **"Backup"** tab
2. Free tier: Cloud Provider Snapshots (limited)
3. Paid tier: Continuous backup with point-in-time recovery

---

## Security Best Practices

1. ✅ Use strong, unique passwords for MongoDB
2. ✅ Rotate JWT_SECRET periodically
3. ✅ Enable HTTPS (Render provides free SSL)
4. ✅ Keep dependencies updated (`npm audit fix`)
5. ✅ Monitor logs for suspicious activity
6. ✅ Set up rate limiting (already configured in backend)
7. ✅ Never expose API keys or secrets in frontend code

---

## Support & Resources

- **Render Documentation**: https://render.com/docs
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com/
- **Vite Deployment**: https://vitejs.dev/guide/static-deploy.html
- **GitHub Repository**: https://github.com/ishaansh20/Pingalo

---

## Quick Reference

### Backend URL Structure

```
https://pingalo-backend.onrender.com
├── /api/auth/register
├── /api/auth/login
├── /api/url
├── /api/analytics/:shortCode
└── /:shortCode (redirect)
```

### Frontend URLs

```
https://pingalo.onrender.com
├── / (Landing page)
├── /register
├── /login
├── /dashboard (Protected)
└── /analytics/:shortCode (Protected)
```

---

## Congratulations! 🎉

Your Pingalo URL shortener is now live and ready to use. Share your deployment URL and start shortening links!

**Need help?** Open an issue on the [GitHub repository](https://github.com/ishaansh20/Pingalo/issues).
