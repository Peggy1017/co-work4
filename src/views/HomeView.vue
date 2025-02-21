<template>
  <div @scroll="onScroll">
    <header>
      <div class="logo">就是一个组 </div>
      <input type="text" v-model="search" @input="searchArticle" placeholder="搜索文章" style="height: 30px;">

      <nav>
        <ul>
          <li>
            <RouterLink to="/">首页</RouterLink>
          </li>
          <li><a href="#">课程</a></li>
          <li><a href="#">热榜</a></li>
          <li><a href="#">商城</a></li>
          <li>
            <div class="dropdown">
              <button class="dropbtn"><img src="../assets/logo.svg"> </button>
              <div class="dropdown-content">
                <a>
                  <RouterLink to="user">我的主页</RouterLink>
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
          <li><a href="#">关注</a></li>
          <li><a href="#">综合</a></li>
          <li><a href="#">视频</a></li>
          <li><a href="#">热榜</a></li>
        </ul>
      </div>

      <div class="content-area">



        <div v-for="article in articles" class="card">
          <!--  -->
          <RouterLink :to="{ name: 'page', params: { id: article.id } }">
            <h2>{{ article.title }}</h2>
          </RouterLink>
          <p>{{ article.title }}...</p>
          <div class="footer">
            <span>{{ article.viewCount }} 浏览</span>
            <span>{{ article.likeCount }} 喜欢</span>
            <span>作者：{{ article.authorName }}</span>
            <span>{{ article.createdAt }}</span>
          </div>
        </div>

        <button v-if="!loading" @click="getArticle">加载更多</button>

        <div v-if="loading" style="text-align: center; font-size: 30px;">
          <span> 加载中...</span>
        </div>
      </div>

      <div class="right-sidebar">
        <div class="create-center">
          <button>
            <RouterLink to="new">写文章</RouterLink>
          </button>
          <button>发视频</button>
          <button>活动</button>
          <button>
            <RouterLink to="draft">草稿箱</RouterLink>
          </button>
        </div>

        <div v-for="article in popular_articles" class="article-ranking">
          <RouterLink :to="{ name: 'page', params: { id: article.id } }">
            <h3>{{ article.title }}</h3>
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

import { RouterLink } from 'vue-router';

export default {
  name: 'HomeView',
  components: {

  },
  data() {
    return {
      articles: [],
      popular_articles: [],
      currentPage: 1,
      popular_page: 1,
      loading: false,
      search: '',

    }
  },
  mounted() {
    this.getArticle();
    this.popularArticle();
  },
  methods: {
    async searchArticle() {
      this.loading = true;
      try {
        const response = await axios.get('/api/articles/selectArticlesLikeTitle', {
          params: {
            title: this.search,
          }
        });
        // extend the articles array
        this.articles = response.data;
      } catch (error) {
        console.error('请求失败:', error);
      } finally {
        this.loading = false;
      }
    },

    async getArticle() {
      this.loading = true;
      try {
        const response = await axios.get('/api/articles/mostLatestArticles', {
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
    async popularArticle() {
      this.loading = true;
      try {
        const response = await axios.get('/api/articles/mostLikedArticles', {
          params: {
            page: this.popular_page++,
          }
        });
        // extend the articles array
        this.popular_articles = [...this.popular_articles, ...response.data];
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
</style>