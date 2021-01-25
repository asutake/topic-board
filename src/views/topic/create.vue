<template>
  <div class="createPost-container">
    <el-form
      ref="postForm"
      :model="postForm"
      :rules="rules"
      class="form-container"
    >
      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px" prop="title">
              <MDinput
                v-model="postForm.title"
                :maxlength="100"
                name="name"
                required
              >
                Title
              </MDinput>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px" prop="text">
              <MDinput
                v-model="postForm.text"
                :maxlength="100"
                name="name"
                required
              >
                Text
              </MDinput>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">Create</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import MDinput from '@/components/MDinput'
import { addTopic } from '@/api/topic'

const defaultForm = {
  title: '',
  text: ''
}

export default {
  name: 'ArticleDetail',
  components: {
    MDinput
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + 'は必須です',
          type: 'error'
        })
        callback(new Error(rule.field + 'は必須です'))
      } else {
        callback()
      }
    }
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      rules: {
        title: [{ validator: validateRequire }],
        text: [{ validator: validateRequire }]
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('this.postForm', this.postForm)
      this.loading = true

      addTopic(this.postForm)
        .then((response) => {
          this.$notify({
            title: '成功',
            message: '登録しました',
            type: 'success',
            duration: 2000
          })
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }
}
</style>
