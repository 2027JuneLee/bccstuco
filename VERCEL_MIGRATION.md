# Firebase to Vercel Migration Guide

This project has been migrated from Firebase to Vercel.

## Changes Made

### 1. **Removed Firebase Dependencies**
- Removed `firebase` package from main package.json
- Removed `firebase-admin` and `firebase-functions` from functions/package.json
- Deleted `src/config/firebase.js` (Firebase analytics config)

### 2. **Created Vercel Configuration**
- Added [vercel.json](vercel.json) with:
  - Build command: `npm run build`
  - Output directory: `build`
  - SPA rewrites to `/index.html`
  - Cache headers for static assets

### 3. **Serverless Functions**
- Created [api/](api/) directory for Vercel serverless functions
- Example function at [api/hello.js](api/hello.js)
- Old Firebase functions directory kept for reference but deprecated

### 4. **Updated Scripts**
- Added `deploy` script: `vercel --prod`
- Removed Firebase-specific scripts from functions/package.json

### 5. **Updated .gitignore**
- Added `.vercel` directory
- Added Firebase files to ignore list

## Deployment Steps

### First Time Setup

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Link your project**:
   ```bash
   vercel link
   ```

4. **Set up environment variables** (if needed):
   ```bash
   vercel env add SUPABASE_URL
   vercel env add SUPABASE_KEY
   ```

### Deploy

**Development deployment**:
```bash
vercel
```

**Production deployment**:
```bash
npm run deploy
# or
vercel --prod
```

## Serverless Functions

Vercel serverless functions are located in the [api/](api/) directory.

### Example Function
```javascript
// api/hello.js
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello from Vercel!' });
}
```

Access at: `https://your-domain.vercel.app/api/hello`

### Migrating Firebase Functions

If you had Firebase functions, convert them to this format:

**Firebase**:
```javascript
exports.myFunction = functions.https.onRequest((request, response) => {
  response.send("Hello");
});
```

**Vercel**:
```javascript
// api/myFunction.js
export default function handler(req, res) {
  res.status(200).send("Hello");
}
```

## Notes

- **Database**: This project uses Supabase (already configured in [src/supabaseClient.js](src/supabaseClient.js))
- **No Firebase Analytics**: Removed Firebase Analytics. Consider using Vercel Analytics or another solution
- **Old Firebase Files**: The following files can be deleted if you're fully migrated:
  - `firebase.json`
  - `.firebaserc`
  - `firebase-debug.log`
  - `.firebase/` directory
  - `functions/` directory
  - `database.rules.json`
  - `remoteconfig.template.json`

## Environment Variables

Make sure to set these in Vercel dashboard or via CLI:
- `SUPABASE_URL`
- `SUPABASE_KEY`
- Any other environment variables your app needs

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions)
- [Deploying React Apps on Vercel](https://vercel.com/guides/deploying-react-with-vercel)
