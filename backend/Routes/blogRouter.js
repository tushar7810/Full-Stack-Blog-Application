import express from 'express'
import { blogPost , deleteBlog , getAllBlogs , getSingleBlog , getMyBlogs , updateBlog } from '../controllers/blog.controller.js';
import { isAuthenticated , isAuthorized } from '../middlewares/auth.js';

const router = express.Router()

router.post('/post' , isAuthenticated, isAuthorized('Author') , blogPost )
router.delete('/delete/:id' , isAuthenticated, isAuthorized('Author') , deleteBlog )
router.get('/allBlogs', isAuthenticated , getAllBlogs)
router.get('/oneBlog/:id', isAuthenticated , getSingleBlog)
router.get('/myBlogs', isAuthenticated , isAuthorized('Author') , getMyBlogs)
router.put('/updateBlog/:id' , isAuthenticated , isAuthorized('Author') , updateBlog)


export default router;