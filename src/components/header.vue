<!--
 * @Fileoverview: 页眉
 * @Description: 通用页眉
-->
<template>
  <div class="header">
    <div class="header__wrapper">
      <div class="header__left flex-auto">
        <router-link
          :to="{ name: PAGE_URL_OVERVIEW }"
          class="flex-row align-items-center flex-none"
        >
          <img class="header__logo" :src="j11BImg" alt="logo" />
        </router-link>
        <div ref="menuContainer" class="header__menu flex-auto">
          <div
            v-for="(menu, i) in visibleMenuList"
            @click="goTo(menu)"
            :key="i"
            class="header__menu-item"
          >
            <div
              class="header__menu-title"
              :class="{ active: menu.path.startsWith(activeMenu) }"
              v-if="menu.meta.isShow"
            >
              {{ menu.meta.title }}
            </div>
          </div>
        </div>
      </div>
      <div class="header__right flex-none">
        <el-dropdown class="header__user">
          <div class="ml10">
            Kylin
            <i class="icon fa fa-caret-down"></i>
          </div>
          <el-dropdown-menu slot="dropdown"
            >>
            <el-dropdown-item>
              <i class="fa fa-user"></i>
              个人信息
            </el-dropdown-item>
            <el-dropdown-item>
              <i class="fa fa-power-off"></i>
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
import {
  PAGE_URL_OVERVIEW,
  PAGE_URL_AMIS_EDIT
} from '@/constant/page-url-constants';
import nestjsImg from '@/assets/img/nestjs.png';
import j11BImg from '@/assets/img/J-11B.jpg';

import { routes as visibleMenuList } from '@/router';
export default {
  data() {
    return {
      nestjsImg,
      j11BImg,
      PAGE_URL_OVERVIEW,
      activeMenu: '',
      visibleMenuList
    };
  },
  watch: {
    $route() {
      this.highlightAndFillSub();
    }
  },
  mounted() {
    this.highlightAndFillSub();
  },
  methods: {
    goTo(menu) {
      this.$router.push(menu.path);
    },
    highlightAndFillSub() {
      // 逐级将菜单进行高亮
      const currentPathArr = this.$route.path.split('/');
      this.activeMenu = '/' + (currentPathArr[1] || '');
    }
  }
};
</script>
<style lang="less" scoped>
.header {
  padding: 0;
  background-color: var(--bg-color-header);
  color: var(--color-white);
  font-size: 14px;
  font-weight: 500;
  z-index: 100;

  &__logo {
    height: 24px;
  }

  &__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    width: 100%;
    height: 46px;
    .icon {
      font-size: 14px;
    }
  }

  &__left,
  &__right {
    display: flex;
    align-items: stretch;
    height: 100%;
  }

  &__search {
    display: flex;
    align-items: center;
    margin-right: 20px;
    padding-top: 2px;
    cursor: pointer;

    &:hover {
      color: var(--color-white);
      font-weight: 600;
    }
  }

  &__message {
    display: flex;
    align-items: center;
    cursor: pointer;

    i {
      font-size: 16px;
      color: var(--color-white);
    }

    ::v-deep .el-badge__content {
      font-size: 8px;
      height: 12px;
      line-height: 12px;
    }
  }

  &__user {
    position: relative;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: var(--color-white);
    cursor: pointer;

    i {
      font-size: 18px;

      font-weight: 550;
    }
  }

  &__menu {
    margin-left: 50px;
    display: flex;
  }
  &__menu-item {
    cursor: pointer;
    padding: 0 5px;
    text-decoration: none;
    display: flex;
    align-items: center;
  }
  &__menu-title {
    padding: 0 15px;
    height: 30px;
    line-height: 30px;
    border-radius: 2px;
    letter-spacing: 1px;
    color: var(--color-white);

    &.active {
      background: var(--color-primary);

      &:hover {
        background: var(--color-primary);
      }
    }

    &:hover {
      background: var(--bg-color-header-hover);
    }
  }

  &__sub-menu {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 20px;
    height: 42px;
    background: var(--color-white);
    box-sizing: border-box;
    box-shadow: var(--box-shadow-menu);

    &__icon {
      color: var(--text-color-secondary);
      font-size: 14px;
    }

    &__item {
      display: inline-block;
      cursor: pointer;
      padding: 0 10px;
      text-decoration: none;
      font-size: 12px;
      color: var(--text-color-regular);

      &.active {
        font-weight: 600;
        font-size: 12px;
        color: var(--color-primary);

        .header__sub-menu__icon {
          color: var(--color-primary);
          font-size: 14px;
        }
      }

      + .header__sub-menu__item {
        margin-left: 30px;
      }
    }
  }

  .right-divider {
    align-self: center;
  }
}
</style>
<style lang="less">
.el-dropdown-menu.header__menu-more {
  border: none;
  padding: 10px;
  background-color: var(--bg-color-header);
  color: var(--color-white);
  font-size: 14px;
  min-width: 100px;
  .el-dropdown-menu__item {
    margin-top: 10px;
    padding: 0 15px;
    height: 30px;
    line-height: 30px;
    border-radius: 2px;
    letter-spacing: 1px;
    color: var(--color-white);
    &:first-of-type {
      margin-top: 0;
    }
    &:hover {
      background-color: var(--bg-color-header-hover);
    }
    &.active {
      background: var(--color-primary);
      &:hover {
        background: var(--color-primary);
      }
    }
  }
}
</style>
