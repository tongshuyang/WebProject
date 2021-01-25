<template>
    <div class="custom-shop">
        <i class="sprite-icon shopping" @click="showList"></i>

        <div class="recommend-item" v-show="recommendItem && recommendItem.img">
            <i class="sprite-icon small-close" @click="hideRecommend"></i>
            <img
                :src="recommendItem && recommendItem.img"
                class="brand"
                @click="buy(recommendItem)"
            />
        </div>

        <div class="list" v-show="isShowList">
            <div class="list-head">
                <span>共{{ list && list.length }}件商品</span>
                <i class="sprite-icon small-close" @click="hideList"></i>
            </div>
            <div class="list-content">
                <div
                    v-for="(item, index) in list"
                    :key="item.itemId"
                    class="item"
                >
                    <div class="item-img-wrap">
                        <span class="seq">{{ index + 1 }}</span>
                        <img :src="item.img" class="item-img" />
                    </div>
                    <div class="item-content">
                        <p class="item-desc">{{ item.desc }}</p>
                        <div class="item-price-wrapper">
                            <span class="price">
                                <span class="price-prefix">￥</span
                                >{{ item.price }}
                            </span>
                            <span class="origin-price">
                                <span class="price-prefix">￥</span
                                >{{ item.originalPrice }}
                            </span>
                            <span class="button-buy" @click="buy(item)"
                                >去购买</span
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isShowList: false,
            recommendItem: {},
            list: []
        };
    },
    methods: {
        showList: function() {
            this.isShowList = true;
        },
        hideList: function() {
            this.isShowList = false;
        },
        hideRecommend: function() {
            this.recommendItem = {};
        },
        removeItem: function(item) {
            var index = 0,
                len = this.list.length,
                product;
            for (; index < len; index++) {
                product = this.list[index];
                if (product.itemId === item.itemId) {
                    break;
                }
            }
            if (product) {
                this.list.splice(index, 1);
            }
        },
        buy: function(item) {
            if (item && item.url) {
                window.open(item && item.url);
            }
        }
    },
    mounted() {
        var me = this;
        // 获取缓存自定义广播信令
        BJY.api.getCachedBroadcast("bjy_product_shelf_change");
        // 监听自定义广播信令
        BJY.api.onReceiveBroadcast("customProduct", function(
            fromeId,
            data,
            cache
        ) {
            // {"cover":"ic_product","isOnShelf":true,"itemId":0,"name":"0、高中数学必备技巧大招高中数学必备技巧大招高中数 - 模拟数据"}
            console.log(data);
            if (data && "string" === typeof data) {
                data = JSON.parse(data);
            }
            if (data) {
                var item = me.list.find(t => t.itemId === data.itemId);
                if (!data.isOnShelf) {
                    item && me.removeItem(item);
                } else {
                    me.list.push({
                        itemId: data.itemId,
                        desc: data.name,
                        price: 499.99,
                        originalPrice: 99999,
                        img:
                            "https://test-img.baijiayun.com/baijiacloud/1237788_o92r2znp.png",
                        url: "https://www.baijiayun.com/"
                    });
                }
                me.recommendItem = {
                    img: me.list[0] && me.list[0].img,
                    url: me.list[0] && me.list[0].url
                };
            }
        });
        // 主播端发送对应广播信令，即可以在监听中收到对应数据
        /*
        BJY.api.sendBroadcast(
            'customProduct',
            {"cover":"ic_product","isOnShelf":true,"itemId":0,"name":"0、高中数学必备技巧大招高中数学必备技巧大招高中数 - 模拟数据"},
            {
                all: true,
                cache: true
            }
        );
        */
    }
};
</script>

<style lang="scss" scoped>
.custom-shop {
    .list {
        background: #ffffff;
        border-radius: 12px 12px 0px 0px;
        padding: 0 16px;
        min-height: 160px;

        .list-head {
            display: flex;
            justify-content: space-between;
            align-items: center;
            line-height: 40px;
            font-size: 16px;
            border-bottom: 1px dashed #dddddd;
        }

        .list-content {
            margin-top: 6px;
        }

        .item {
            display: flex;
            & + .item {
                margin-top: 6px;
            }
            .item-img-wrap {
                position: relative;
                .item-img {
                    width: 114px;
                    height: 96px;
                    margin-right: 4px;
                }
                .seq {
                    position: absolute;
                    left: 0px;
                    top: 0px;
                    width: 16px;
                    height: 16px;
                    line-height: 16px;
                    border-radius: 100%;
                    background-color: #9fa8b5;
                    color: #ffffff;
                }
            }
            .item-content {
                display: flex;
                flex-direction: column;

                .item-desc {
                    height: 70px;
                    text-align: left;
                    overflow: hidden;
                }

                .item-price-wrapper {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .price {
                        font-size: 18px;
                        color: #ff1f49;
                        .price-prefix {
                            font-size: 12px;
                        }
                    }
                    .origin-price {
                        font-size: 12px;
                        color: #999999;
                        text-decoration-line: line-through;
                    }
                    .button-buy {
                        width: 72px;
                        line-height: 24px;
                        background: #fa6400;
                        border-radius: 12px;
                        font-size: 14px;
                        color: #333333;
                    }
                }
            }
        }
    }
}
.recommend-item {
    .brand {
        display: block;
        width: 100%;
    }
    .small-close {
        position: absolute;
        top: 12px;
        right: 15px;
    }
}
</style>
