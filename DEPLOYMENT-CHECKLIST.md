# Deployment Checklist for Hero Banner Issues

## Before Deployment:

### 1. Verify Image Paths
- [ ] Check all hero background images exist in `assets/images/` folder
- [ ] Verify image file names match exactly (case-sensitive):
  - `hero-bg01.png`
  - `hero-bg02.png` 
  - `hero-bg03.png`
  - `hero-bg04.png`

### 2. Test Image Loading
- [ ] Open browser developer tools
- [ ] Check Network tab for any 404 errors on image files
- [ ] Verify images load correctly in different browsers

### 3. Server Configuration
- [ ] Ensure server serves static files correctly
- [ ] Check MIME types for PNG files are configured
- [ ] Verify no caching issues preventing image updates

## After Deployment:

### 1. Test Hero Animation
- [ ] Hero background images should cycle every 4 seconds
- [ ] If JavaScript fails, CSS fallback animation should work
- [ ] Check browser console for any error messages

### 2. Test Text Animation
- [ ] Character animations should appear with staggered timing
- [ ] Text should be readable even if animations fail

### 3. Performance Check
- [ ] Page should load within 3 seconds
- [ ] Images should not cause layout shifts
- [ ] Animations should be smooth on mobile devices

## Troubleshooting:

### If Images Don't Load:
1. Check browser developer tools Network tab
2. Verify image file paths are correct
3. Check server permissions for assets folder
4. Try accessing image URLs directly in browser

### If Animations Don't Work:
1. Check browser console for JavaScript errors
2. Verify both main.js and hero-fix.js are loading
3. CSS fallback should still provide basic animation
4. Clear browser cache and try again

### Common Issues:
- **Case sensitivity**: Linux servers are case-sensitive for file names
- **Path issues**: Relative paths may need adjustment based on server setup
- **CORS issues**: Some servers block cross-origin requests
- **Caching**: Old cached files may prevent updates from showing