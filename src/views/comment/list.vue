<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="内容">
        <template slot-scope="{ row }">
          <router-link :to="'/comment/detail/' + row.id" class="link-type">
            <span>{{ row.text }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column min-width="60px" label="Likes">
        <template slot-scope="{ row }">
          <el-button type="primary" size="mini" icon="el-icon-success" @click="onLike(row)">
            <span>{{ row.popularity.likes }}</span>
          </el-button>
        </template>
      </el-table-column>

      <el-table-column min-width="60px" label="DisLikes">
        <template slot-scope="{ row }">
          <el-button type="primary" size="mini" icon="el-icon-warning" @click="onDisLike(row)">
            <span>{{ row.popularity.dislikes }}</span>
          </el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="120">
        <template slot-scope="scope">
          <router-link :to="'/comment/edit/' + scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">
              Edit
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { listComment, likeComment, dislikeComment } from '@/api/topic'
import Pagination from '@/components/Pagination'

export default {
  name: 'CommentList',
  components: { Pagination },
  props: ['topic_id', 'reply_to_comment_id'],
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        topic_id: this.topic_id,
        reply_to_comment_id: this.reply_to_comment_id,
        page: 1,
        limit: 20
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    onLike(comment) {
      this.loading = true

      likeComment(comment.id)
        .then((response) => {
          this.$notify({
            title: '成功',
            message: 'Likeしました',
            type: 'success',
            duration: 2000
          })

          comment.popularity.likes += 1
        })
        .catch((err) => {
          this.$notify({
            title: '失敗',
            message: err,
            type: 'error',
            duration: 2000
          })
        })

      this.loading = false
    },
    onDisLike(comment) {
      this.loading = true

      dislikeComment(comment.id)
        .then((response) => {
          this.$notify({
            title: '成功',
            message: 'DisLikeしました',
            type: 'success',
            duration: 2000
          })

          comment.popularity.dislikes += 1
        })
        .catch((err) => {
          this.$notify({
            title: '失敗',
            message: err,
            type: 'error',
            duration: 2000
          })
        })

      this.loading = false
    },
    getList() {
      this.listLoading = true
      listComment(this.listQuery).then((res) => {
        this.list = res.data
        this.total = parseInt(res.headers['resource-count'])
        this.listLoading = false
      })
    }
  }
}
</script>
