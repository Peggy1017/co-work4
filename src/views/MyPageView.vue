<template>
    <div @scroll="onScroll">
        <header>
            <div class="logo">就是一个组</div>
            <nav>
                <ul>
                    <li><li><RouterLink to="/">首页</RouterLink></li></li>
                    <li><a href="#">课程</a></li>
                    <li><a href="#">热榜</a></li>
                    <li><a href="#">商城</a></li>
                    <li><div class="dropdown">
			        <button class="dropbtn"><img src="../assets/logo.svg"> </button>
			        <div class="dropdown-content">
			        <a ><RouterLink to="user">我的主页</RouterLink></a>
              </div>
            </div></li>
                </ul>
            </nav>
        </header>

        <div class="main-content">
            <div class="sidebar">
                <ul>
                    <li>
                        <RouterLink to="/">返回主页</RouterLink>
                    </li>
                    <li><RouterLink to="/like">喜欢</RouterLink></li>
                    <li><RouterLink to="/mypage">我的文章</RouterLink></li>
                    <li><a href="#">收藏</a></li>
                    <li><a href="#">分享</a></li>
                </ul>
            </div>

            <div v-for="article in articles" class="content-area">
                
                <RouterLink :to="{ name: 'page', params: { id: article.id } }" >
            <h2>{{ article.title }}</h2>
          </RouterLink>
          <p>{{ article.title }}...</p>


            </div>

            <div class="right-sidebar">
                <div class="create-center">
                    <button><RouterLink to="setting">更新个人信息</RouterLink></button>
                </div>

                <div v-for="mypage in mypages" class="article-ranking">
          <RouterLink :to="{ name: 'page', params: { id: likes.id } }" >
            <h2>{{ mypage.title }}</h2>
          </RouterLink>
          <p>{{ mypage.title }}...</p>
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
            user: {},
            articles: [],
            mypages:[]
        }
    },
    mounted() {
        this.getArticle();
        this.getUser();
        this.popularArticle();
    },
    methods: {
        async getUser() {
            this.loading = true;
            try {
                const response = await axios.get('/api/user/selectUserLikeName?userName='
                );
                this.user = response.data[0];
            } catch (error) {
                console.error('请求失败:', error);
            } finally {
                this.loading = false;
            }
        },

    //     "id": 1,
    // "title": "Java 入门",
    // "authorName": "John Doe",
    // "viewCount": 100,
    // "likeCount": 50,
    // "status": 1,
    // "createdAt": "2023-09-15T12:00:00",
    // "updatedAt": "2023-09-15T12:00:00"
    
    async getArticle() {
      this.loading = true;
      try {
        const response = await axios.get('/api/articles/articlesOfAuthor', {
          params: {
            userId:this.id,
          }
        });
        // extend the articles array
        this.mypages = [...this.mypages, ...response.data];
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
.dropdown{
            position: relative;;
            display: inline-block;
            float:left;
        }
        .dropdown-content{
            margin-top: 0px;
            display: none;
            position: absolute;
            background-color: #f9f9f9;
            min-width: 160px;
            box-shadow:  0px 8px 16px 0px rgba(0,0,0,0.2);
        }
        .dropdown-content a{
            color: #000000;
            padding: 12px 16px;
            text-decoration: none;
            display: block;
        }
        .dropdown-content a:hover{background-color: #f1f1f1}
        .dropdown:hover .dropdown-content{
            display: block;
        }
        .dropdown:hover .dropbtn{
            background-color: #3e8e41;
        }
        
        
        .dropbtn{
          width:60px;
          height:60px;
        }
</style>