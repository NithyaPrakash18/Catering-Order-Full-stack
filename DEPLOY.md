# Deploy to Vercel

## Steps to Deploy:

1. **Install Vercel CLI** (if not installed)
   ```bash
   npm install -g vercel
   ```

2. **Build the project**
   ```bash
   npm run build
   ```

3. **Deploy to Vercel**
   ```bash
   vercel
   ```
   - Follow the prompts
   - Login to your Vercel account
   - Select project settings
   - Deploy!

## Alternative: Deploy via Vercel Dashboard

1. Go to https://vercel.com
2. Sign in with GitHub/GitLab/Bitbucket
3. Click "Add New Project"
4. Import your Git repository
5. Vercel will auto-detect React and deploy

## Environment Variables

If you have a backend API, set the API URL:
- Go to Project Settings > Environment Variables
- Add: `REACT_APP_API_URL` = `your-backend-url`

## Important Notes

- The `vercel.json` file is already configured for React Router
- Make sure to update API endpoints in `src/services/api.js` to your production backend URL
- Current backend URL is set to `http://localhost:5000/api` - change this before deployment