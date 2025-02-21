<template>
    <div @scroll="onScroll">
        <header>
            <div class="logo">就是一个组</div>
            <nav>
                <ul>
                    <li>
                    <li>
                        <RouterLink to="/">首页</RouterLink>
                    </li>
                    </li>
                    <li><a href="#">课程</a></li>
                    <li><a href="#">热榜</a></li>
                    <li><a href="#">商城</a></li>
                    <li>
                        <div class="dropdown">
                            <button class="dropbtn"><img src="../assets/logo.svg"> </button>
                            <div class="dropdown-content">
                                <a>
                                    <RouterLink to="/user">我的主页</RouterLink>
                                </a>
                            </div>
                        </div>
                    </li>
                </ul>
            </nav>
        </header>

        <div class="main-content">
            <div class="sidebar">
                <ul>
                    <li>
                        <RouterLink to="/">返回主页</RouterLink>
                    </li>
                    <li @click="insertlike">喜欢</li>
                    <li><a href="#">评论</a></li>
                    <li><a href="#">收藏</a></li>
                    <li><a href="#">分享</a></li>
                </ul>
            </div>

            <div class="content-area">
                <div class="card">
                    <h2>{{ article.title }}</h2>
                    <p>{{ article.content }} </p>
                    <div class="footer">
                        <span>{{ article.viewCount }} 浏览</span>
                        <span>{{ article.likeCount }} 喜欢</span>
                        <span>作者：{{ article.authorName }}</span>
                        <span>{{ article.createdAt }}</span>
                    </div>
                </div>


                <div v-if="loading" style="text-align: center; font-size: 30px;">
                    <span> 加载中...</span>
                </div>

                <div>
                    <h3>评论:</h3>
                    <div>
                        <textarea v-model="commentContent" placeholder="平等交流，友善表达"></textarea>
                        <button @click="submitComment(0)">提交评论</button>
                    </div>

                    <div v-for="comment in comments" :key="comment.id">
                        <div class="card">
                            <h4>{{ comment.content }}</h4>
                            <p>{{ comment.createdAt }}</p>
                            <button @click="submitComment(comment.id)" style="width: 100px; height: 40px;">回复</button>
                        </div>
                        <div class="card sub-comment" v-for="subComment in comment.subComments" :key="subComment.id">
                            <h4> {{ subComment.content }}</h4>
                            <p> {{ subComment.createdAt }}</p>
                        </div>
                    </div>

                </div>

            </div>

            <div class="right-sidebar">
                <div class="create-center">
                    <button>
                        <RouterLink to="/new">写文章</RouterLink>
                    </button>
                    <button>发视频</button>
                    <button>活动</button>
                    <button>
                        <RouterLink to="/draft">草稿箱</RouterLink>
                    </button>
                </div>

                <div v-for="article in articles" class="article-ranking">
                    <RouterLink :to="{ name: 'page', params: { id: article.id } }">
                        <h2>{{ article.title }}</h2>
                    </RouterLink>
                    <p>{{ article.title }}...</p>
                </div>

                <button v-if="!loading" @click="popularArticle">加载更多</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';


export default {
    name: 'HomeView',
    components: {

    },
    props: {
        id: String
    },
    data() {
        return {
            article: {},
            comments: [],
        }
    },
    mounted() {
        this.getArticle();
        this.getComments();
    },
    methods: {
        async submitComment(comment_id) {
            console.log(this.commentContent);
            const response = await axios.post('/api/comments/insertComment', {
                "articleId": this.id,
                "userId": 101,
                "content": this.commentContent,
                "parentCommentId": comment_id || 0 //默认为0，不写它则为0
            });
            this.getComments();
        },

        async insertlike() {
            const response = await axios.post('/api/articleLikes/insertArticleLike', {
                "articleId": this.id,
                "userId": 101,
            });
        },

        async getArticle() {
            this.loading = true;
            try {
                const response = await axios.get('/api/articles/selectArticlesById', {
                    params: {
                        articleId: this.id,
                    }
                });
                this.article = response.data;
            } catch (error) {
                console.error('请求失败:', error);
            } finally {
                this.loading = false;
            }
        },
        async getComments() {
            this.loading = true;
            try {
                const response = await axios.get('/api/comments/selectCommentsOfOneArticle', {
                    params: {
                        articleId: this.id,
                        parentCommentId: 0,
                    }
                });
                for (let i = 0; i < response.data.length; i++) {
                    const subResponse = await axios.get('/api/comments/selectCommentsOfOneArticle', {
                        params: {
                            articleId: this.id,
                            parentCommentId: response.data[i].id,
                        }
                    });
                    response.data[i].subComments = subResponse.data;
                }
                // extend the articles array
                this.comments = response.data;
            } catch (error) {
                console.error('请求失败:', error);
            } finally {
                this.loading = false;
            }
        },
        async popularArticle() {
            this.loading = true;
            try {
                const response = await axios.get('/api/articles/mostLikedArticles', {
                    params: {
                        page: this.currentPage++,
                    }
                });
                // extend the articles array
                this.articles = [...this.articles, ...response.data];
            } catch (error) {
                console.error('请求失败:', error);
            } finally {
                this.loading = false;
            }
        },
    },

}

</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

textarea {
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
}

body {
    font-family: Arial, sans-serif;
}

header {
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    background-color: #f4f4f4;
}

header .logo {
    font-weight: bold;
}

header nav ul {
    display: flex;
    list-style-type: none;
}

header nav ul li {
    margin-left: 20px;
}

header nav ul li a {
    text-decoration: none;
    color: black;
}

.main-content {
    display: flex;
    margin-top: 20px;
}

.sidebar {
    width: 200px;
    background-color: #f9f9f9;
    padding: 20px;
}

.sidebar ul {
    list-style-type: none;
}

.sidebar ul li {
    margin-bottom: 15px;
}

.sidebar ul li a {
    text-decoration: none;
    color: black;
}

.content-area {
    flex-grow: 1;
    padding: 20px;
}

.card {
    background-color: #fff;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.card h2 {
    margin-bottom: 10px;
}

.card .footer {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}

.right-sidebar {
    width: 250px;
    padding: 20px;
}

button {
    display: block;
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    background-color: #ff6200;
    border: none;
    color: white;
    cursor: pointer;
}

button:hover {
    background-color: #e15d00;
}

.article-ranking ul {
    list-style-type: none;
}

.article-ranking ul li {
    margin-bottom: 10px;
}

.article-ranking ul li a {
    text-decoration: none;
    color: black;
}

.dropdown {
    position: relative;
    ;
    display: inline-block;
    float: left;
}

.dropdown-content {
    margin-top: 0px;
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
}

.dropdown-content a {
    color: #000000;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
}

.dropdown-content a:hover {
    background-color: #f1f1f1
}

.dropdown:hover .dropdown-content {
    display: block;
}

.dropdown:hover .dropbtn {
    background-color: #3e8e41;
}


.dropbtn {
    width: 60px;
    height: 60px;
}

.sub-comment {
    margin-top: 5px;
    margin-left: 20px;
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>