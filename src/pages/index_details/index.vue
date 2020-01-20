<template>
  <div>
    <div id="headerHeight" class="header">
      <div class="item">
        <div class="left">
          <img src="../../../static/images/index_details/header1.png" alt />
          <p>比利时</p>
        </div>
        <div class="center">
          <p class="title">VS</p>
          <p>未开</p>
        </div>
        <div class="right">
          <img src="../../../static/images/index_details/header2.png" alt />
          <p>爱尔兰</p>
        </div>
      </div>
      <div class="btn">
        <button>动画直播</button>
      </div>
    </div>
    <div class="box_content">
      <div class="nav">
        <div
          :class="key == index ? 'on':''"
          v-for="item in tabs"
          :key="item.key"
          @click="onBtn"
          :data-key="item.key"
        >{{item.name}}</div>
      </div>
      <!-- 阵容 -->
      <div class="content1 content" :class="key == 0 ? 'on':''">
        <div>
          <div class="title">首发阵容</div>
          <div class="list">
            <div class="left">
              <p>比利时</p>
            </div>
            <div class="right">
              <p>爱尔兰</p>
            </div>
          </div>
          <div class="list">
            <div class="left">
              <p>比利时</p>
            </div>
            <div class="right">
              <p>爱尔兰</p>
            </div>
          </div>
          <div class="list">
            <div class="left">
              <p>比利时</p>
            </div>
            <div class="right">
              <p>爱尔兰</p>
            </div>
          </div>
        </div>
        <div>
          <div class="title">替补阵容</div>
          <div class="list">
            <div class="left">
              <p>比利时</p>
            </div>
            <div class="right">
              <p>爱尔兰</p>
            </div>
          </div>
          <div class="list">
            <div class="left">
              <p>比利时</p>
            </div>
            <div class="right">
              <p>爱尔兰</p>
            </div>
          </div>
          <div class="list">
            <div class="left">
              <p>比利时</p>
            </div>
            <div class="right">
              <p>爱尔兰</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 分析 -->
      <div class="content2 content" :class="key == 1 ? 'on':''">
        <div class="item">
          <div class="item_nav">
            <div class="left">
              <p>赛前情报</p>
            </div>
            <div class="right">
              <img
                :class="{on : isActive}"
                @click="onHide"
                src="../../../static/images/index_details/index_fx2.png"
                alt
              />
            </div>
          </div>
          <div class="item_content" :class="{on : isActive}">
            <div class="title">
              <div class="left">
                <img src="../../../static/images/index_details/index_fx3.png" alt />
                华盛顿奇才
              </div>
              <div class="center">
                <img src="../../../static/images/index_details/index_fx1.png" alt />
              </div>
              <div class="right">
                <img src="../../../static/images/index_details/index_fx4.png" alt />
                芝加哥公牛
              </div>
            </div>
            <div class="primary">
              <div class="list">
                <div class="left">
                  <p class="p1">比利时队主场战绩出色</p>
                  <p class="p2">比利时本赛季至今的主场战绩十分出色</p>
                </div>
                <div class="right">
                  <p class="p1">比利时队主场战绩出色</p>
                  <p class="p2">比利时本赛季至今的主场战绩十分出色</p>
                </div>
              </div>
              <div class="list">
                <div class="left">
                  <p class="p1">比利时队主场战绩出色</p>
                  <p class="p2">比利时本赛季至今的主场战绩十分出色</p>
                </div>
                <div class="right">
                  <p class="p1">比利时队主场战绩出色</p>
                  <p class="p2">比利时本赛季至今的主场战绩十分出色</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="item1">
          <div class="item_nav">
            <div class="left">
              <p>近期战绩</p>
            </div>
            <div class="right">
              <wux-selectable color="#07913B" value="1" />同主客
              <img
                :class="{on : isActive1}"
                @click="onHide1"
                src="../../../static/images/index_details/index_fx2.png"
                alt
              />
            </div>
          </div>
          <div class="item_content" :class="{on : isActive1}">
            <div class="title table">
              <div class="t1">日期</div>
              <div class="t2">赛事</div>
              <div class="t3">主队</div>
              <div class="t4">比分</div>
              <div class="t5">客队</div>
              <div class="t6">盘路</div>
            </div>
            <div>
              <div class="table1 table">
                <div class="t1">2019/12/17</div>
                <div class="t2">中北美联</div>
                <div class="t3">华盛顿奇才</div>
                <div class="t4">2-2(1-1)</div>
                <div class="t5">华盛顿奇才</div>
                <div class="t6 red">0.9赢</div>
              </div>
              <div class="table1 table">
                <div class="t1">2019/12/17</div>
                <div class="t2">中北美联</div>
                <div class="t3">华盛顿奇才</div>
                <div class="t4">2-2(1-1)</div>
                <div class="t5">华盛顿奇才</div>
                <div class="t6 green">1走</div>
              </div>
              <div class="table1 table">
                <div class="t1">2019/12/17</div>
                <div class="t2">中北美联</div>
                <div class="t3">华盛顿奇才</div>
                <div class="t4">2-2(1-1)</div>
                <div class="t5">华盛顿奇才</div>
                <div class="t6 blue">0.9输</div>
              </div>
            </div>
            <div class="btm">
              近3场，华盛顿奇才 胜
              <span class="red">0</span>平
              <span class="green">1</span>输
              <span class="blue">2</span>，胜率
              <span class="red">0%</span>
            </div>
          </div>
        </div>
        <div class="item2">
          <div class="item_nav">
            <div class="left">
              <p>联赛盘路走势</p>
            </div>
            <div class="right">
              <img
                :class="{on : isActive2}"
                @click="onHide2"
                src="../../../static/images/index_details/index_fx2.png"
                alt
              />
            </div>
          </div>
          <div class="item_content" :class="{on : isActive2}">
            <div class="title">
              <img src="../../../static/images/index_details/index_fx3.png" alt />
              <p>华盛顿奇才</p>
            </div>
            <div class="table">
              <div class="t1">全场</div>
              <div class="t1">赢盘</div>
              <div class="t1">走水</div>
              <div class="t1">输盘</div>
              <div class="t1">赢盘率</div>
              <div class="t1">大球</div>
              <div class="t1">大球率</div>
              <div class="t1">小球</div>
              <div class="t1">小球率</div>
            </div>
            <div>
              <div class="table1 table">
                <div class="t1">总</div>
                <div class="t1">0.8</div>
                <div class="t1">0.8</div>
                <div class="t1">0.5</div>
                <div class="t1 red">22%</div>
                <div class="t1">0.9</div>
                <div class="t1 red">11%</div>
                <div class="t1">0.9</div>
                <div class="t1 red">55%</div>
              </div>
              <div class="table1 table">
                <div class="t1">主</div>
                <div class="t1">0.8</div>
                <div class="t1">0.8</div>
                <div class="t1">0.5</div>
                <div class="t1 red">22%</div>
                <div class="t1">0.9</div>
                <div class="t1 red">11%</div>
                <div class="t1">0.9</div>
                <div class="t1 red">55%</div>
              </div>
              <div class="table1 table">
                <div class="t1">客</div>
                <div class="t1">0.8</div>
                <div class="t1">0.8</div>
                <div class="t1">0.5</div>
                <div class="t1 red">22%</div>
                <div class="t1">0.9</div>
                <div class="t1 red">11%</div>
                <div class="t1">0.9</div>
                <div class="t1 red">55%</div>
              </div>
              <div class="btm">
                <p>近六</p>
                <p>
                  <span class="red">赢</span>
                  <span class="red">赢</span>
                  <span class="red">赢</span>
                  <span class="red">赢</span>
                  <span class="red">赢</span>
                  <span class="red">赢</span>
                </p>
                <p>
                  <span class="blue">小</span>
                  <span class="blue">小</span>
                  <span class="blue">小</span>
                  <span class="red">大</span>
                  <span class="blue">小</span>
                  <span class="red">大</span>
                </p>
              </div>
            </div>
            <div class="title">
              <img src="../../../static/images/index_details/index_fx4.png" alt />
              <p>芝加哥公牛</p>
            </div>
            <div class="table">
              <div class="t1">全场</div>
              <div class="t1">赢盘</div>
              <div class="t1">走水</div>
              <div class="t1">输盘</div>
              <div class="t1">赢盘率</div>
              <div class="t1">大球</div>
              <div class="t1">大球率</div>
              <div class="t1">小球</div>
              <div class="t1">小球率</div>
            </div>
            <div>
              <div class="table1 table">
                <div class="t1">总</div>
                <div class="t1">0.8</div>
                <div class="t1">0.8</div>
                <div class="t1">0.5</div>
                <div class="t1 red">22%</div>
                <div class="t1">0.9</div>
                <div class="t1 red">11%</div>
                <div class="t1">0.9</div>
                <div class="t1 red">55%</div>
              </div>
              <div class="table1 table">
                <div class="t1">主</div>
                <div class="t1">0.8</div>
                <div class="t1">0.8</div>
                <div class="t1">0.5</div>
                <div class="t1 red">22%</div>
                <div class="t1">0.9</div>
                <div class="t1 red">11%</div>
                <div class="t1">0.9</div>
                <div class="t1 red">55%</div>
              </div>
              <div class="table1 table">
                <div class="t1">客</div>
                <div class="t1">0.8</div>
                <div class="t1">0.8</div>
                <div class="t1">0.5</div>
                <div class="t1 red">22%</div>
                <div class="t1">0.9</div>
                <div class="t1 red">11%</div>
                <div class="t1">0.9</div>
                <div class="t1 red">55%</div>
              </div>
              <div class="btm">
                <p>近六</p>
                <p>
                  <span class="red">赢</span>
                  <span class="red">赢</span>
                  <span class="red">赢</span>
                  <span class="red">赢</span>
                  <span class="red">赢</span>
                  <span class="red">赢</span>
                </p>
                <p>
                  <span class="blue">小</span>
                  <span class="blue">小</span>
                  <span class="blue">小</span>
                  <span class="red">大</span>
                  <span class="blue">小</span>
                  <span class="red">大</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 指数 -->
      <div class="content3 content" :class="key == 2 ? 'on':''">
        <wux-segmented-control
          :current="current"
          controlled
          :values="['亚指', '欧指', '大小']"
          @change="onChange"
        ></wux-segmented-control>
        <div class="seg" :class="onhide == 0 ? 'on':''">
          <div class="seg_content">
            <div class="seg_nav">
              <span class="p1">指数统计</span>
              <span class="p2">(共3家)</span>
            </div>
            <div class>
              <div class="echarts-wrap">
                <div style="height: 182rpx;position:relative">
                  <mpvue-echarts
                    v-if="!radarImg"
                    :echarts="echarts"
                    :onInit="onInit"
                    canvasId="demo-canvas"
                  />
                  <img
                    @click="onsrc"
                    :dataSrc="radarImg"
                    :src="handleCanvarToImg"
                    style="width: 100%; height: 180px;position:absolute;left:0;right:0;top:0;"
                  />
                </div>
                <div class="box_data">
                  <div class="seg_tab">
                    <div class="title table">
                      <div>盘口</div>
                      <div>高水公司</div>
                      <div>主队水位</div>
                      <div>客队水位</div>
                    </div>
                  </div>
                  <div class="table_list">
                    <div class="table">
                      <div>305</div>
                      <div>易胜博</div>
                      <div>0.98</div>
                      <div>0.88</div>
                    </div>
                    <div class="table">
                      <div>305</div>
                      <div>易胜博</div>
                      <div>0.98</div>
                      <div>0.88</div>
                    </div>
                    <div class="table">
                      <div>305</div>
                      <div>易胜博</div>
                      <div>0.98</div>
                      <div>0.88</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="yz_data">
            <div class="seg_nav">
              <span class="p1">定制公司</span>
              <span class="p2">(共3家)</span>
            </div>
            <div class="yz_content">
              <div class="yz_title">
                <div class="t1">公司</div>
                <div>初</div>
                <div>即</div>
              </div>
              <div class="yz_list">
                <div class="list">
                  <div class="t1">易胜博</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                </div>
                <div class="list">
                  <div class="t1">易胜博</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                </div>
                <div class="list">
                  <div class="t1">易胜博</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                </div>
              </div>
            </div>
          </div>
          <div class="yz_data">
            <div class="seg_nav">
              <span class="p1">定制公司</span>
              <span class="p2">(共3家)</span>
            </div>
            <div class="yz_content">
              <div class="yz_title">
                <div class="t1">公司</div>
                <div>初</div>
                <div>即</div>
              </div>
              <div class="yz_list">
                <div class="list">
                  <div class="t1">易胜博</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                </div>
                <div class="list">
                  <div class="t1">易胜博</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                </div>
                <div class="list">
                  <div class="t1">易胜博</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                </div>
              </div>
            </div>
          </div>
          <div class="yz_data">
            <div class="seg_nav">
              <span class="p1">定制公司</span>
              <span class="p2">(共3家)</span>
            </div>
            <div class="yz_content">
              <div class="yz_title">
                <div class="t1">公司</div>
                <div>初</div>
                <div>即</div>
              </div>
              <div class="yz_list">
                <div class="list">
                  <div class="t1">易胜博</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                </div>
                <div class="list">
                  <div class="t1">易胜博</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                </div>
                <div class="list">
                  <div class="t1">易胜博</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="seg" :class="onhide == 1 ? 'on':''">
          <div class="oz_content">
            <div class="seg_nav">
              <span class="p1">指数统计</span>
              <span class="p2">(共3家)</span>
            </div>
            <div class="oz_data">
              <div style="height: 320rpx">
                <mpvue-echarts :echarts="echarts" :onInit="onInit3" canvasId="canvas3" />
              </div>
              <div class="box">
                <p class="title">当前最大指数公司及数值</p>
                <div class="table">
                  <div class="t1 t_title">
                    <div>主胜</div>
                    <div>平局</div>
                    <div>客胜</div>
                  </div>
                  <div class="t1">
                    <div>10BET</div>
                    <div>10BET</div>
                    <div>10BET</div>
                  </div>
                  <div class="t1">
                    <div>8.8</div>
                    <div>6.5</div>
                    <div>6.8</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="oz_list">
            <div class="seg_nav">
              <span class="p1">定制公司</span>
              <span class="p2">(共3家)</span>
            </div>
            <div class="list_title">
              <div class="t1">公司</div>
              <div>主胜</div>
              <div>平局</div>
              <div>客胜</div>
              <div>返还率</div>
            </div>
            <div class="list_box">
              <div class="list">
                <div class="t1 green">最大值</div>
                <div class="right">
                  <div class="table">
                    <div>初</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                  </div>
                  <div class="table">
                    <div>即</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                  </div>
                </div>
              </div>
              <div class="list">
                <div class="t1 green">最小值</div>
                <div class="right">
                  <div class="table">
                    <div>初</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                  </div>
                  <div class="table">
                    <div>即</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                  </div>
                </div>
              </div>
              <div class="list">
                <div class="t1 green">平均值</div>
                <div class="right">
                  <div class="table">
                    <div>初</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                  </div>
                  <div class="table">
                    <div>即</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                  </div>
                </div>
              </div>
              <div class="list">
                <div class="t2 t1 green">易胜博</div>
                <div class="right">
                  <div class="table">
                    <div>初</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                  </div>
                  <div class="table">
                    <div>即</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                  </div>
                </div>
              </div>
              <div class="list">
                <div class="t2 t1 green">易胜博</div>
                <div class="right">
                  <div class="table">
                    <div>初</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                  </div>
                  <div class="table">
                    <div>即</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                  </div>
                </div>
              </div>
              <div class="list">
                <div class="t2 t1 green">易胜博</div>
                <div class="right">
                  <div class="table">
                    <div>初</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                  </div>
                  <div class="table">
                    <div>即</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                  </div>
                </div>
              </div>
              <div class="list">
                <div class="t2 t1 green">易胜博</div>
                <div class="right">
                  <div class="table">
                    <div>初</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                  </div>
                  <div class="table">
                    <div>即</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                  </div>
                </div>
              </div>
              <div class="list">
                <div class="t2 t1 green">易胜博</div>
                <div class="right">
                  <div class="table">
                    <div>初</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                  </div>
                  <div class="table">
                    <div>即</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                  </div>
                </div>
              </div>
              <div class="list">
                <div class="t2 t1 green">易胜博</div>
                <div class="right">
                  <div class="table">
                    <div>初</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                  </div>
                  <div class="table">
                    <div>即</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                  </div>
                </div>
              </div>
              <div class="list">
                <div class="t2 t1 green">易胜博</div>
                <div class="right">
                  <div class="table">
                    <div>初</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                  </div>
                  <div class="table">
                    <div>即</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="seg" :class="onhide == 2 ? 'on':''">
          <div class="seg_content">
            <div class="seg_nav">
              <span class="p1">指数统计</span>
              <span class="p2">(共3家)</span>
            </div>
            <div class>
              <div class="echarts-wrap">
                <div style="height: 182rpx">
                  <mpvue-echarts :echarts="echarts" :onInit="onInit2" canvasId="canvas" />
                </div>
                <div class="box_data">
                  <div class="seg_tab">
                    <div class="title table">
                      <div>盘口</div>
                      <div>高水公司</div>
                      <div>大球水位</div>
                      <div>小球水位</div>
                    </div>
                  </div>
                  <div class="table_list">
                    <div class="table">
                      <div>305</div>
                      <div>易胜博</div>
                      <div>0.98</div>
                      <div>0.88</div>
                    </div>
                    <div class="table">
                      <div>305</div>
                      <div>易胜博</div>
                      <div>0.98</div>
                      <div>0.88</div>
                    </div>
                    <div class="table">
                      <div>305</div>
                      <div>易胜博</div>
                      <div>0.98</div>
                      <div>0.88</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="yz_data">
            <div class="seg_nav">
              <span class="p1">定制公司</span>
              <span class="p2">(共3家)</span>
            </div>
            <div class="yz_content">
              <div class="yz_title">
                <div class="t1">公司</div>
                <div>初</div>
                <div>即</div>
              </div>
              <div class="yz_list">
                <div class="list">
                  <div class="t1">易胜博</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                </div>
                <div class="list">
                  <div class="t1">易胜博</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                </div>
                <div class="list">
                  <div class="t1">易胜博</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                  <div>0.8</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 直播 -->
      <div class="content4 content" :class="key == 3 ? 'on':''">
        <div class="live_content">
          <div class="live_header">
            <div class="head">
              <div class="left">
                <img src="../../../static/images/index_details/index_details2.png" alt />
                <p>比利时</p>
              </div>
              <div class="right">
                <p>爱尔兰</p>
                <img src="../../../static/images/index_details/index_details1.png" alt />
              </div>
            </div>
            <div style="height: 300rpx">
              <mpvue-echarts :echarts="echarts" :onInit="onInit4" canvasId="live-canvas" />
            </div>
          </div>
        </div>
      </div>
      <!-- 聊天 -->
      <div class="content5 content" :class="key == 4 ? 'on':''">
        <div class="content_btm">
          <img src="http://tt.winit168.cn/666/lnxy/images/content4.png" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts/dist/echarts.min";
import mpvueEcharts from "mpvue-echarts";

let chart = null;
let chart1 = null;

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    tooltip: {
      trigger: "item",
      formatter: ""
    },
    legend: {
      orient: "vertical",
      itemWidth: 5,
      top: "middle",
      textStyle: {
        color: "#666666",
        fontSize: "10"
      },
      left: 150,
      data: ["盘口上升公司 1家", "盘口不变公司 4家", "盘口下降公司 1家"],
      icon: "circle",
      selectedMode: false
    },
    series: [
      {
        left: 0,
        z: 1,
        type: "pie",
        width: "160",
        radius: ["55%", "70%"],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: "outside"
          },
          emphasis: {
            show: false
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          { value: 1, name: "盘口上升公司 1家", selected: false },
          { value: 4, name: "盘口不变公司 4家", selected: false },
          { value: 1, name: "盘口下降公司 1家", selected: false }
        ],
        color: ["#FF5858", "#FFD058", "#64C4ED"],
        hoverAnimation: false,
        legendHoverLink: false
      }
    ]
  }; // ECharts 配置项

  chart.setOption(option);

  return chart; // 返回 chart 后可以自动绑定触摸操作
}

function initChart2(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    tooltip: {
      trigger: "item",
      formatter: ""
    },
    legend: {
      orient: "horizontal",
      itemWidth: 5,
      top: "15",
      textStyle: {
        color: "#666666",
        fontSize: "10"
      },
      left: 150,
      data: ["盘口上升公司 1家", "盘口不变公司 4家", "盘口下降公司 1家"],
      icon: "circle",
      selectedMode: false
    },
    series: [
      {
        left: 0,
        top: "90",
        type: "pie",
        width: "160",
        radius: ["55%", "70%"],
        silent: true,
        avoidLabelOverlap: false,
        silent: true,
        label: {
          normal: {
            show: false,
            position: "center"
          },
          emphasis: {
            show: false
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          { value: 1, name: "盘口上升公司 1家", selected: false },
          { value: 4, name: "盘口不变公司 4家", selected: false },
          { value: 1, name: "盘口下降公司 1家", selected: false }
        ],
        color: ["#FF5858", "#FFD058", "#64C4ED"],
        hoverAnimation: false,
        legendHoverLink: false
      }
    ]
  }; // ECharts 配置项

  chart.setOption(option);

  return chart; // 返回 chart 后可以自动绑定触摸操作
}

function initChart3(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    tooltip: {
      trigger: "item",
      formatter: ""
    },
    legend: [
      {
        orient: "horizontal",
        itemWidth: 5,
        top: "85",
        textStyle: {
          color: "#666666",
          fontSize: "10"
        },
        left: 30,
        data: ["上升 1家", "不变 1家", "下降 1家"],
        icon: "circle",
        selectedMode: false
      },
      {
        orient: "vertical",
        itemWidth: 5,
        top: "85",
        textStyle: {
          color: "#666666",
          fontSize: "10"
        },
        left: 135,
        data: ["上升 1家", "不变 1家", "下降 1家"],
        icon: "circle",
        selectedMode: false
      },
      {
        orient: "vertical",
        itemWidth: 5,
        top: "85",
        textStyle: {
          color: "#666666",
          fontSize: "10"
        },
        left: 245,
        data: ["上升 1家", "不变 1家", "下降 1家"],
        icon: "circle",
        selectedMode: false
      }
    ],
    series: [
      {
        left: 0,
        top: "90",
        type: "pie",
        width: "120",
        radius: ["55%", "70%"],
        avoidLabelOverlap: false,

        label: {
          normal: {
            show: true,
            position: "center",
            formatter: function() {
              return "主胜";
            },
            textStyle: {
              color: "#666666",
              fontSize: 10
            }
          },
          emphasis: {
            show: false
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          { value: 1, name: "上升 1家", selected: false },
          { value: 4, name: "不变 1家", selected: false },
          { value: 1, name: "下降 1家", selected: false }
        ],
        color: ["#FF5858", "#FFD058", "#64C4ED"],
        hoverAnimation: false,
        legendHoverLink: false
      },
      {
        left: 110,
        top: "90",
        type: "pie",
        width: "120",
        radius: ["55%", "70%"],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: true,
            position: "center",
            formatter: function() {
              return "平局";
            },
            textStyle: {
              color: "#666666",
              fontSize: 10
            }
          },
          emphasis: {
            show: false
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          { value: 1, name: "上升 1家", selected: false },
          { value: 4, name: "不变 1家", selected: false },
          { value: 1, name: "下降 1家", selected: false }
        ],
        color: ["#FF5858", "#FFD058", "#64C4ED"],
        hoverAnimation: false,
        legendHoverLink: false
      },
      {
        left: 220,
        top: "90",
        type: "pie",
        width: "120",
        radius: ["55%", "70%"],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: true,
            position: "center",
            formatter: function() {
              return "客胜";
            },
            textStyle: {
              color: "#666666",
              fontSize: 10
            }
          },
          emphasis: {
            show: false
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          { value: 1, name: "上升 1家", selected: false },
          { value: 4, name: "不变 1家", selected: false },
          { value: 1, name: "下降 1家", selected: false }
        ],
        color: ["#FF5858", "#FFD058", "#64C4ED"],
        hoverAnimation: false,
        legendHoverLink: false
      }
    ]
  }; // ECharts 配置项

  chart.setOption(option);

  return chart; // 返回 chart 后可以自动绑定触摸操作
}

function initChart4(canvas, width, height) {
  var pp = this;
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    tooltip: {
      trigger: "item",
      formatter: ""
    },
    series: [
      {
        left: 0,
        top: "90",
        type: "pie",
        width: "120",
        radius: ["55%", "70%"],
        avoidLabelOverlap: false,

        label: {
          normal: {
            show: true,
            position: "center",
            formatter: function() {
              return "进攻";
            },
            textStyle: {
              color: "#666666",
              fontSize: 10
            }
          },
          emphasis: {
            show: false
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [{ value: 1, selected: false }, { value: 4, selected: false }],
        color: ["#FF5858", "#64C4ED"],
        hoverAnimation: false,
        legendHoverLink: false
      },
      {
        left: 110,
        top: "90",
        type: "pie",
        width: "120",
        radius: ["55%", "70%"],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: true,
            position: "center",
            formatter: function() {
              return "危险\n进攻";
            },
            textStyle: {
              color: "#666666",
              fontSize: 10,
              lineHeight: 13
            }
          },
          emphasis: {
            show: false
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [{ value: 1, selected: false }, { value: 4, selected: false }],
        color: ["#FF5858", "#64C4ED"],
        hoverAnimation: false,
        legendHoverLink: false
      },
      {
        left: 220,
        top: "90",
        type: "pie",
        width: "120",
        radius: ["55%", "70%"],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: true,
            position: "center",
            formatter: function() {
              return "控球率";
            },
            textStyle: {
              color: "#666666",
              fontSize: 10
            }
          },
          emphasis: {
            show: false
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [{ value: 1, selected: false }, { value: 4, selected: false }],
        color: ["#FF5858", "#64C4ED"],
        hoverAnimation: false,
        legendHoverLink: false
      }
    ]
  }; // ECharts 配置项

  chart.setOption(option);

  handleCanvarToImg(pp);

  return chart; // 返回 chart 后可以自动绑定触摸操作
}

function handleCanvarToImg(e) {
  
  wx.canvasToTempFilePath(
    {
      x: 0,
      y: 0,
      // width: 260,
      // height: 180,
      canvasId: "demo-canvas",
      success: function(res) {
        console.log("666" + res.tempFilePath);
        e.radarImg = res.tempFilePath;
        console.log(e.radarImg)
        // that.setData({ radarImg: res.tempFilePath });
        // then.radarImg = res.tempFilePath;
        // return res.tempFilePath;
      }
    },
    this
  );
}

export default {
  mounted() {},
  onShow() {
    var then = this;
    console.log("123" + this.radarImg);
  },
  computed: {},
  components: {
    mpvueEcharts
  },
  created() {},
  data() {
    return {
      key: 2,
      tabs: [
        {
          key: 0,
          name: "阵容"
        },
        {
          key: 1,
          name: "分析"
        },
        {
          key: 2,
          name: "指数"
        },
        {
          key: 3,
          name: "直播"
        },
        {
          key: 4,
          name: "聊天"
        }
      ],
      isActive: false,
      isActive1: false,
      isActive2: false,
      echarts,
      onInit: initChart,
      onInit2: initChart2,
      onInit3: initChart3,
      onInit4: initChart4,
      src: handleCanvarToImg,
      current: 0,
      onhide: 0,
      radarImg: ""
      // opts: {
      //   onInit: initChart("column", 400, 300, F2)
      // }
    };
  },
  methods: {
    onBtn(e) {
      // console.log(e)
      this.key = e.currentTarget.dataset.key;
    },
    onHide(e) {
      console.log(e);
      this.isActive = !this.isActive;
    },
    onHide1(e) {
      console.log(e);
      this.isActive1 = !this.isActive1;
    },
    onHide2(e) {
      console.log(e);
      this.isActive2 = !this.isActive2;
    },
    onChange(e) {
      console.log(e.mp.detail.key);
      this.current = e.mp.detail.key;
      this.onhide = e.mp.detail.key;
    },
    onsrc(e) {
      var then = this;
      console.log(then.radarImg);
      
    }
  }
};
</script>

<style scoped>
.header {
  background: url("https://fb.hxweixin.top/images/header_background.png")
    no-repeat;
  background-size: 100% 100%;
  position: relative;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99999;
}
.header .item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 130rpx 90rpx;
  padding-bottom: 162rpx;
  text-align: center;
}
.header .item img {
  width: 108rpx;
  height: 108rpx;
}
.header .item p {
  color: #fff;
  font-size: 28rpx;
}
.header .item .left p,
.header .item .right p {
  margin-top: 22rpx;
}
.header .item .center p {
  font-size: 20rpx;
}
.header .item .center .title {
  font-size: 48rpx;
  font-weight: bold;
}
.header .btn {
  position: absolute;
  bottom: 60rpx;
  left: 50%;
  transform: translateX(-50%);
}
.header .btn button {
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
  font-size: 20rpx;
  width: 150rpx;
  height: 50rpx;
  border-radius: 25rpx;
}
.box_content {
  margin-top: 568rpx;
}
.box_content .nav {
  display: flex;
  justify-content: space-between;
  padding: 0 30rpx;
  background-color: #fff;
  position: fixed;
  top: 460rpx;
  left: 0;
  right: 0;
  z-index: 99999;
}
.box_content .nav div {
  padding: 20rpx 0;
  font-size: 30rpx;
  color: #999999;
  position: relative;
}
.box_content .nav div.on {
  color: #4cb13b;
}
.box_content .nav div.on::before {
  content: "";
  position: absolute;
  bottom: 0;
  width: 40rpx;
  left: 10rpx;
  background-color: #4cb13b;
  height: 4rpx;
  animation: btm 200ms;
}
.content {
  display: none;
}
.content.on {
  display: block;
}
@keyframes btm {
  from {
    width: 0;
  }
  to {
    width: 40rpx;
  }
}
.content1 {
  margin-top: 30rpx;
}
.content1 .title {
  background-color: rgba(153, 218, 255, 0.1);
  color: #333333;
  font-size: 24rpx;
  padding: 15rpx 0;
  text-align: center;
}
.content1 .list {
  background-color: #fff;
  display: flex;
  border-bottom: 2rpx solid #f2f2f2;
}
.content1 .list .left {
  border-right: 2rpx solid rgba(0, 0, 0, 0.1);
}
.content1 .list .left,
.content1 .list .right {
  position: relative;
  flex: 1;
}
.content1 .list p {
  color: #333;
  font-size: 24rpx;
  padding: 15rpx 66rpx;
}
.content1 .list p::before {
  position: absolute;
  content: "1";
  width: 26rpx;
  height: 26rpx;
  line-height: 26rpx;
  text-align: center;
  color: #fff;
  left: 30rpx;
  top: 50%;
  transform: translateY(-50%);
  display: inline-block;
  border-radius: 50%;
  font-size: 20rpx;
}
.content1 .list .left p::before {
  background-color: #ff5757;
}
.content1 .list .right p::before {
  background-color: #64c5ee;
}
.content2 {
  margin-top: 30rpx;
  /* background-color: #fff */
}
.content2 .item {
  background-color: #fff;
}
.content2 .item_nav {
  display: flex;
  justify-content: space-between;
  padding: 18rpx 30rpx;
  align-items: center;
  position: relative;
  border-bottom: 2rpx solid #f2f2f2;
}
.content2 .item_nav .left p {
  font-size: 26rpx;
  color: #333333;
  font-weight: bold;
}
.content2 .item_nav .left p::before {
  position: absolute;
  content: "";
  background-color: #4cb13b;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 30rpx;
  width: 4rpx;
}
.content2 .item_nav .right {
  font-size: 20rpx;
  display: flex;
  align-items: center;
}
.content2 .item_nav .right img {
  width: 22rpx;
  height: 12rpx;
  vertical-align: middle;
  transition: all 200ms;
  margin-left: 30rpx;
}
.content2 .item_nav .right img.on {
  transform: rotate(-90deg);
}
.content2 .item_content.on {
  display: none;
}
.content2 .item .item_content .title {
  position: relative;
  padding: 10rpx 30rpx;
  display: flex;
  justify-content: space-between;
  background-color: rgba(153, 218, 255, 0.1);
}
.content2 .item .item_content .title > div {
  display: flex;
  align-items: center;
  font-size: 24rpx;
  color: #333333;
}
.content2 .item .item_content .title > div img {
  width: 34rpx;
  height: 34rpx;
  margin-right: 10rpx;
}
.content2 .item .item_content .title .center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.content2 .item .item_content .title .center img {
  width: 29rpx;
  height: 19rpx;
}
.content2 .item .item_content .primary .list {
  display: flex;
  border-top: 2rpx solid #f2f2f2;
}
.content2 .item .item_content .primary .list > div {
  flex: 1;
  padding: 30rpx;
}
.content2 .item .item_content .primary .list .left {
  border-right: 2rpx solid #f2f2f2;
}
.content2 .item .item_content .primary .list > div .p1 {
  color: #333;
  font-size: 24rpx;
  font-weight: 500;
}
.content2 .item .item_content .primary .list > div .p2 {
  color: #666;
  font-size: 22rpx;
  margin-top: 15rpx;
}
.content2 .item1 {
  margin-top: 30rpx;
  background-color: #fff;
}
.content2 .item1 .item_content .table {
  display: flex;
  border-bottom: 2rpx solid #f2f2f2;
}

.content2 .item1 .item_content .table.title > div {
  font-size: 24rpx;
}
.content2 .item1 .item_content .table > div {
  font-size: 22rpx;
  text-align: center;
  color: #333;
  padding: 12rpx 0;
  border-right: 2rpx solid #f2f2f2;
}
.content2 .item1 .item_content .table > div:last-child {
  border: none;
}
.content2 .item1 .item_content .table .t1 {
  width: 20%;
}
.content2 .item1 .item_content .table .t2 {
  width: 20%;
}
.content2 .item1 .item_content .table .t3 {
  width: 20%;
}
.content2 .item1 .item_content .table .t4 {
  width: 20%;
}
.content2 .item1 .item_content .table .t5 {
  width: 20%;
}
.content2 .item1 .item_content .table .t6 {
  width: 16%;
}

.content2 .item_content .btm {
  text-align: center;
  font-size: 22rpx;
  padding: 15rpx 0;
}
.content2 .item2 {
  background-color: #fff;
  margin-top: 30rpx;
}
.content2 .item2 .title {
  padding: 15rpx 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(153, 218, 255, 0.1);
}
.content2 .item2 .title p {
  font-size: 24rpx;
  color: #333333;
}
.content2 .item2 .title img {
  width: 34rpx;
  height: 34rpx;
  margin-right: 10rpx;
}
.content2 .item2 .item_content .table {
  display: flex;
  border-bottom: 2rpx solid #f2f2f2;
}

.content2 .item2 .item_content .table.title > div {
  font-size: 24rpx;
}
.content2 .item2 .item_content .table > div {
  font-size: 22rpx;
  text-align: center;
  color: #333;
  padding: 12rpx 0;
  border-right: 2rpx solid #f2f2f2;
}
.content2 .item2 .item_content .table > div:last-child {
  border: none;
}
.content2 .item2 .item_content .table .t1 {
  width: 12%;
}
.content2 .item2 .item_content .table .t2 {
  width: 12%;
}
.content2 .item2 .item_content .table .t3 {
  width: 12%;
}
.content2 .item2 .item_content .table .t4 {
  width: 12%;
}
.content2 .item2 .item_content .table .t5 {
  width: 12%;
}
.content2 .item2 .item_content .table .t6 {
  width: 12%;
}
.content2 .item2 .item_content .btm {
  display: flex;
  font-size: 24rpx;
  padding: 15rpx 30rpx;
}
.content2 .item2 .item_content .btm p {
  margin-right: 110rpx;
}
/* .content3 {
  margin-top: 568rpx;
} */
.content3 .seg {
  display: none;
}
.content3 .seg.on {
  display: block;
}
.content3 .seg_content {
  padding: 0 30rpx;
}

.echarts-wrap {
  width: 100%;
  /* height: 182rpx; */
  background: #fff;
  border-radius: 10rpx;
  overflow: hidden;
}
/* .echarts-wrap canvas{
  height: 182rpx;
} */
.content3 .seg_nav {
  padding: 0rpx 30rpx;
  position: relative;
  margin-bottom: 30rpx;
}
.content3 .seg_nav::before {
  position: absolute;
  content: "";
  left: 0rpx;
  width: 6rpx;
  height: 30rpx;
  top: 55%;
  transform: translateY(-55%);
  background: #4cb13b;
}
.content3 .seg_nav .p1 {
  font-weight: bold;
  font-size: 26rpx;
  color: #333333;
}
.content3 .seg_nav .p2 {
  font-size: 20rpx;
  margin-left: 10rpx;
  color: #666666;
}
.box_data {
  border-bottom-left-radius: 10rpx;
  border-bottom-right-radius: 10rpx;
}
.content3 .seg_content .table {
  display: flex;
  background: #fff;
  border-top: 2rpx solid #f2f2f2;
}
.content3 .seg_content .table > div {
  flex: 1;
  text-align: center;
  font-size: 22rpx;
  color: #333;
  padding: 10rpx 0;
  border-right: 2rpx solid #f2f2f2;
}
.content3 .seg_content .table > div:last-child {
  border: none;
}
.yz_data {
  margin-top: 30rpx;
}
.yz_content {
  background: #fff;
}
.content3 .yz_data .seg_nav {
  padding-left: 60rpx;
}
.content3 .yz_data .seg_nav::before {
  left: 30rpx;
}
.yz_content .yz_title {
  display: flex;
}
.yz_content .yz_title div {
  width: 40%;
  text-align: center;
  padding: 10rpx 0;
  font-size: 24rpx;
  /* border-right: 2rpx solid #f2f2f2 */
}
.yz_content .yz_title .t1 {
  width: 20%;
  flex: auto;
}
.yz_content .yz_list .list {
  display: flex;
  text-align: center;
  border-top: 2rpx solid #f2f2f2;
}
.yz_content .yz_list .list > div {
  width: 13.4%;
  padding: 10rpx 0;
  font-size: 22rpx;
  border-right: 2rpx solid #f2f2f2;
}
.yz_content .yz_list .list > div:last-child {
  border: none;
}
.yz_content .yz_list .list .t1 {
  width: 20%;
  flex: auto;
  color: #4cb13b;
  position: relative;
}
.yz_content .yz_list .list .t1::before {
  content: "";
  position: absolute;
  right: 10rpx;
  top: 52%;
  transform: translateY(-52%);
  width: 0;
  height: 0;
  border-width: 10rpx;
  border-color: transparent transparent transparent #4cb13b;
  border-style: solid;
}
.oz_content {
  padding: 0 30rpx;
}
.oz_data {
  background: #fff;
  border-radius: 10rpx;
  overflow: hidden;
}
.oz_data .box {
  text-align: center;
  margin-top: 0rpx;
}
.oz_data .box .title {
  font-size: 22rpx;
  color: #666666;
  margin-bottom: 30rpx;
}
.oz_data .box .t1 {
  display: flex;
  border-top: 2rpx solid #f2f2f2;
}
.oz_data .box .t1 > div {
  flex: 1;
  font-size: 22rpx;
  color: #333;
  padding: 10rpx 0;
  border-right: 2rpx solid #f2f2f2;
}
.oz_data .box .t1 > div:last-child {
  border: none;
}
.oz_data .box .t1.t_title > div {
  color: #666666;
}
.oz_list .seg_nav {
  margin-top: 40rpx;
  padding-left: 60rpx;
}
.oz_list .seg_nav::before {
  left: 30rpx;
}
.oz_list .list_title,
.oz_list .list_box {
  background: #fff;
}
.oz_list .list_title {
  display: flex;
}
.oz_list .list_title > div {
  width: 15.5%;
  /* border-right: 2rpx solid #f2f2f2; */
  padding: 15rpx 0;
  text-align: center;
  font-size: 24rpx;
}
/* .oz_list .list_title>div:last-child{
  border: none
} */
.oz_list .list_title > div.t1 {
  width: 22.53%;
  margin-right: 15.5%;
}

.oz_list .list_box .list {
  position: relative;
  display: flex;
  border-top: 2rpx solid #f2f2f2;
}
.oz_list .list_box .list .right {
  width: 77.47%;
}
.oz_list .list_box .list .t1 {
  width: 22.53%;
  text-align: center;
  border-right: 2rpx solid #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22rpx;
  position: relative;
}
.oz_list .list_box .list .t1.t2::after {
  content: "";
  position: absolute;
  right: 10rpx;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-width: 10rpx;
  border-color: transparent transparent transparent #4cb13b;
  border-style: solid;
  z-index: 99;
}
.oz_list .list_box .list .table {
  display: flex;
  width: 100%;
  border-bottom: 2rpx solid #f2f2f2;
}
.oz_list .list_box .list .table:last-child {
  border: none;
}
.oz_list .list_box .list .table > div {
  width: 20%;
  border-right: 2rpx solid #f2f2f2;
  font-size: 22rpx;
  padding: 15rpx 0;
  text-align: center;
}
.live_content .live_header {
  background: #fff;
}
.live_content .live_header .head {
  padding: 30rpx 25rpx;
  display: flex;
  justify-content: space-between;
}
.live_content .live_header .left,
.live_content .live_header .right {
  display: flex;
  align-items: center;
}
.live_content .live_header img {
  width: 24rpx;
  height: 24rpx;
}
.live_content .live_header p {
  font-size: 24rpx;
}
.live_content .live_header .left p {
  color: #fb5a51;
}
.live_content .live_header .right p {
  color: #64c5ee;
}
.live_content .live_header .left img {
  margin-right: 10rpx;
}
.live_content .live_header .right img {
  margin-left: 10rpx;
}
.content_btm {
  position: fixed;
  bottom: 0;
  z-index: 99;
  left: 0;
  right: 0;
}
.content_btm img {
  width: 100%;
  height: 88rpx;
  vertical-align: middle;
}
</style>
