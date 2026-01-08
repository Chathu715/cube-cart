# MongoDB Atlas Setup Guide (Free Tier)

## Step 1: Create MongoDB Atlas Account

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with Google/Email (it's 100% free, no credit card needed)

## Step 2: Create a Free Cluster

1. After logging in, click **"Build a Database"**
2. Choose **"M0 FREE"** tier
3. Select a cloud provider (AWS/Google/Azure - doesn't matter)
4. Choose a region close to you (e.g., Singapore for Sri Lanka)
5. Give your cluster a name (e.g., "ChefCube")
6. Click **"Create"**

## Step 3: Create Database User

1. Click **"Security" → "Database Access"**
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Username: `chefcube-user`
5. Password: Click **"Autogenerate Secure Password"** and COPY IT!
6. User Privileges: Select **"Read and write to any database"**
7. Click **"Add User"**

## Step 4: Allow Network Access

1. Click **"Security" → "Network Access"**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for development)
   - This adds `0.0.0.0/0`
4. Click **"Confirm"**

## Step 5: Get Your Connection String

1. Go back to **"Database"** (left sidebar)
2. Click **"Connect"** button on your cluster
3. Choose **"Drivers"**
4. Select: **Driver:** Node.js, **Version:** 5.5 or later
5. Copy the connection string that looks like:
   ```
   mongodb+srv://chefcube-user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## Step 6: Update Your .env.local File

1. Open `chef-cube/.env.local`
2. Replace `<password>` with your actual password from Step 3
3. Add the database name at the end:

```env
MONGODB_URI=mongodb+srv://chefcube-user:YOUR_PASSWORD_HERE@cluster0.xxxxx.mongodb.net/chef-cube?retryWrites=true&w=majority
```

**Important:** Replace:
- `YOUR_PASSWORD_HERE` with the password you copied
- `cluster0.xxxxx` with your actual cluster address

## Step 7: Test the Connection

Run:
```bash
cd chef-cube
npm run dev
```

Open: http://localhost:3000

You should see the Carbonara recipe appear (it auto-creates on first run).

## For Vercel Deployment

When deploying to Vercel, you'll use the EXACT SAME connection string:
1. Go to Vercel project settings
2. Add Environment Variable: `MONGODB_URI`
3. Paste the same connection string
4. Deploy!

---

## Troubleshooting

### Error: "MongoNetworkError"
- Check your password is correct (no spaces)
- Make sure Network Access allows `0.0.0.0/0`

### Error: "Authentication failed"
- Double-check username is `chefcube-user`
- Verify password matches

### Database is empty
- The app auto-creates the Carbonara recipe on first API call
- Visit http://localhost:3000 and it will populate automatically
