<template>
  <div style="position: relative;">
    <div style="padding: 40px 45px 20px 50px;">
      {{ title }}

      <el-form>
        <el-row>
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px" prop="text">
              <MDinput
                v-model="text"
                :maxlength="100"
                name="name"
                required
              >
                Text
              </MDinput>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">コメントする</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>

    <CommentList ref="comments" :topic_id="getID()" />

  </div>
</template>

<script>
import {
  detailTopic,
  addComment
} from '@/api/topic'
import CommentList from '@/views/comment/list'
import MDinput from '@/components/MDinput'

export default {
  name: 'TopicDetail',
  components: {
    MDinput,
    CommentList
  },
  props: [{
    'topic_id': {
      type: Number,
      default: null
    }
  }],
  data() {
    return {
      title: 'title is loading',
      text: ''
    }
  },
  created() {
    this.fetchData(this.getID())
  },
  methods: {
    fetchData(id) {
      detailTopic(id)
        .then((res) => {
          this.title = res.data.title
        })
        .catch((err) => {
          console.log(err)
        })
    },
    onSubmit() {
      console.log('this.postForm', this.postForm)
      this.loading = true

      addComment({
        'topic_id': this.getID(),
        'text': this.text
      })
        .then((response) => {
          this.$notify({
            title: '成功',
            message: '登録しました',
            type: 'success',
            duration: 2000
          })

          this.$refs.comments.getList()
          this.text = ''
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
    getID() {
      return this.$route.params && this.$route.params.id
    }
  }
}
</script>
