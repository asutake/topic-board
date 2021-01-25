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
          <el-button type="primary" @click="onUpdate">Update</el-button>
          <el-button type="danger" @click="onDelete">Delete</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>


<script>
import MDinput from "@/components/MDinput";
import { updateComment, detailComment, deleteComment } from "@/api/topic";

const defaultForm = {
  text: "",
};

export default {
  name: "UpdateComment",
  components: {
    MDinput,
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === "") {
        this.$message({
          message: rule.field + "は必須です",
          type: "error",
        });
        callback(new Error(rule.field + "は必須です"));
      } else {
        callback();
      }
    };
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      rules: {
        text: [{ validator: validateRequire }],
      },
    };
  },
  created() {
    this.fetchData(this.getID());
  },
  methods: {
    fetchData(id) {
      detailComment(id)
        .then((response) => {
          this.postForm = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getID() {
      console.log("getID", this.$route.params && this.$route.params.id);
      return this.$route.params && this.$route.params.id;
    },
    onUpdate() {
      console.log("this.postForm", this.postForm);
      this.loading = true;

      updateComment(this.getID(), this.postForm)
        .then((response) => {
          this.$notify({
            title: "成功",
            message: "更新しました",
            type: "success",
            duration: 2000,
          });
        })
        .catch((err) => {
          this.$notify({
            title: "失敗",
            message: err,
            type: "error",
            duration: 2000,
          });
        });

      this.loading = false;
    },
    onDelete() {
      this.loading = true;

      deleteComment(this.getID())
        .then((response) => {
          this.$notify({
            title: "成功",
            message: "削除しました",
            type: "success",
            duration: 2000,
          });
        })
        .catch((err) => {
          this.$notify({
            title: "失敗",
            message: err,
            type: "error",
            duration: 2000,
          });
        });

      this.loading = false;
    },
  },
};
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
