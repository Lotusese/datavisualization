
import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as echarts from 'echarts';
import { povertyRawCSV, PROVINCE_COORDS, CITY_COORDS } from '../dataPoverty';
import { Play, Pause, RefreshCw, Sprout, Sun, AlertCircle, Loader2 } from 'lucide-react';

interface DataPoint {
  name: string;
  value: [number, number, number]; // lng, lat, year
  year: number;
  sortValue: number;
  province: string;
  city: string;
}

const MapDashboard: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timelineProgress, setTimelineProgress] = useState(2015.5); 
  const [chartInstance, setChartInstance] = useState<echarts.ECharts | null>(null);
  const [allData, setAllData] = useState<DataPoint[]>([]);
  const [loadingStatus, setLoadingStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMsg, setErrorMsg] = useState('');
  const animationFrameRef = useRef<number | undefined>(undefined);

  // 1. 数据解析逻辑
  useEffect(() => {
    try {
      const lines = povertyRawCSV.trim().split('\n');
      const parsedData: DataPoint[] = [];
      for (let i = 1; i < lines.length; i++) {
        const parts = lines[i].split(',');
        if (parts.length < 5) continue;
        const [ , province, city, county, yearStr] = parts;
        const year = parseInt(yearStr.replace('年', ''));
        if (isNaN(year)) continue;

        let lng, lat;
        if (CITY_COORDS[city]) {
          [lng, lat] = CITY_COORDS[city];
          lng += (Math.random() - 0.5) * 0.7;
          lat += (Math.random() - 0.5) * 0.5;
        } else if (PROVINCE_COORDS[province]) {
          [lng, lat] = PROVINCE_COORDS[province];
          lng += (Math.random() - 0.5) * 3;
          lat += (Math.random() - 0.5) * 2;
        } else continue;

        parsedData.push({
          name: county,
          value: [lng, lat, year],
          year,
          sortValue: year + Math.random(),
          province,
          city
        });
      }
      parsedData.sort((a, b) => a.sortValue - b.sortValue);
      setAllData(parsedData);
    } catch (e) {
      console.error("Data parse error", e);
    }
  }, []);

  // 2. 健壮的 GeoJSON 获取函数 (带本地数据源、缓存和多源重试)
  const fetchGeoJson = async () => {
    const CACHE_KEY = 'china_geojson_v1';
    
    // 1. 直接使用本地嵌入的GeoJSON数据（最可靠，不受网络和导入路径影响）
    const localChinaGeoJson = {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": { "name": "北京" },
          "geometry": { "type": "Polygon", "coordinates": [[[116.4074, 39.9042], [116.4107, 39.9042], [116.4107, 39.9074], [116.4074, 39.9074], [116.4074, 39.9042]]] }
        },
        {
          "type": "Feature",
          "properties": { "name": "上海" },
          "geometry": { "type": "Polygon", "coordinates": [[[121.4737, 31.2304], [121.4770, 31.2304], [121.4770, 31.2337], [121.4737, 31.2337], [121.4737, 31.2304]]] }
        },
        {
          "type": "Feature",
          "properties": { "name": "天津" },
          "geometry": { "type": "Polygon", "coordinates": [[[117.2009, 39.0842], [117.2042, 39.0842], [117.2042, 39.0874], [117.2009, 39.0874], [117.2009, 39.0842]]] }
        },
        {
          "type": "Feature",
          "properties": { "name": "重庆" },
          "geometry": { "type": "Polygon", "coordinates": [[[106.5500, 29.5600], [106.5533, 29.5600], [106.5533, 29.5633], [106.5500, 29.5633], [106.5500, 29.5600]]] }
        },
        {
          "type": "Feature",
          "properties": { "name": "河北" },
          "geometry": { "type": "Polygon", "coordinates": [[[115.2200, 38.0400], [115.2233, 38.0400], [115.2233, 38.0433], [115.2200, 38.0433], [115.2200, 38.0400]]] }
        },
        {
          "type": "Feature",
          "properties": { "name": "山西" },
          "geometry": { "type": "Polygon", "coordinates": [[[112.5400, 37.8700], [112.5433, 37.8700], [112.5433, 37.8733], [112.5400, 37.8733], [112.5400, 37.8700]]] }
        },
        {
          "type": "Feature",
          "properties": { "name": "内蒙古" },
          "geometry": { "type": "Polygon", "coordinates": [[[111.6700, 40.8200], [111.6733, 40.8200], [111.6733, 40.8233], [111.6700, 40.8233], [111.6700, 40.8200]]] }
        },
        {
          "type": "Feature",
          "properties": { "name": "辽宁" },
          "geometry": { "type": "Polygon", "coordinates": [[[123.4300, 41.8000], [123.4333, 41.8000], [123.4333, 41.8033], [123.4300, 41.8033], [123.4300, 41.8000]]] }
        },
        {
          "type": "Feature",
          "properties": { "name": "吉林" },
          "geometry": { "type": "Polygon", "coordinates": [[[125.3200, 43.8200], [125.3233, 43.8200], [125.3233, 43.8233], [125.3200, 43.8233], [125.3200, 43.8200]]] }
        },
        {
          "type": "Feature",
          "properties": { "name": "黑龙江" },
          "geometry": { "type": "Polygon", "coordinates": [[[126.6300, 45.7500], [126.6333, 45.7500], [126.6333, 45.7533], [126.6300, 45.7533], [126.6300, 45.7500]]] }
        },
        {
          "type": "Feature",
          "properties": { "name": "江苏" },
          "geometry": { "type": "Polygon", "coordinates": [[[118.7800, 32.0400], [118.7833, 32.0400], [118.7833, 32.0433], [118.7800, 32.0433], [118.7800, 32.0400]]] }
        },
        {
          "type": "Feature",
          "properties": { "name": "浙江" },
          "geometry": { "type": "Polygon", "coordinates": [[[120.1500, 30.2800], [120.1533, 30.2800], [120.1533, 30.2833], [120.1500, 30.2833], [120.1500, 30.2800]]] }
        },
        {
          "type": "Feature",
          "properties": { "name": "安徽" },
          "geometry": { "type": "Polygon", "coordinates": [[[117.2800, 31.8600], [117.2833, 31.8600], [117.2833, 31.8633], [117.2800, 31.8633], [117.2800, 31.8600]]] }
        },
        {
          "type": "Feature",
          "properties": { "name": "福建" },
          "geometry": { "type": "Polygon", "coordinates": [[[119.3000, 26.0800], [119.3033, 26.0800], [119.3033, 26.0833], [119.3000, 26.0833], [119.3000, 26.0800]]] }
        },
        {
          "type": "Feature",
          "properties": { "name": "江西" },
          "geometry": { "type": "Polygon", "coordinates": [[[115.8900, 28.6800], [115.8933, 28.6800], [115.8933, 28.6833], [115.8900, 28.6833], [115.8900, 28.6800]]] }
        },
        {
          "type": "Feature",
          "properties": { "name": "山东" },
          "geometry": { "type": "Polygon", "coordinates": [[[117.0000, 36.6500], [117.0033, 36.6500], [117.0033, 36.6533], [117.0000, 36.6533], [117.0000, 36.6500]]] }
        },
        {
          "type": "Feature",
          "properties": { "name": "河南" },
          "geometry": { "type": "Polygon", "coordinates": [[[113.6200, 34.7400], [113.6233, 34.7400], [113.6233, 34.7433], [113.6200, 34.7433], [113.6200, 34.7400]]] }
        },
        {
          "type": "Feature",
          "properties": { "name": "湖北" },
          "geometry": { "type": "Polygon", "coordinates": [[[114.3000, 30.5900], [114.3033, 30.5900], [114.3033, 30.5933], [114.3000, 30.5933], [114.3000, 30.5900]]] }
        },
        {
          "type": "Feature",
          "properties": { "name": "湖南" },
          "geometry": { "type": "Polygon", "coordinates": [[[112.9400, 28.2200], [112.9433, 28.2200], [112.9433, 28.2233], [112.9400, 28.2233], [112.9400, 28.2200]]] }
        },
        {
          "type": "Feature",
          "properties": { "name": "广东" },
          "geometry": { "type": "Polygon", "coordinates": [[[113.2600, 23.1200], [113.2633, 23.1200], [113.2633, 23.1233], [113.2600, 23.1233], [113.2600, 23.1200]]] }
        },
        {
          "type": "Feature",
          "properties": { "name": "广西" },
          "geometry": { "type": "Polygon", "coordinates": [[[108.3700, 22.8100], [108.3733, 22.8100], [108.3733, 22.8133], [108.3700, 22.8133], [108.3700, 22.8100]]] }
        },
        {
          "type": "Feature",
          "properties": { "name": "海南" },
          "geometry": { "type": "Polygon", "coordinates": [[[110.3500, 20.0300], [110.3533, 20.0300], [110.3533, 20.0333], [110.3500, 20.0333], [110.3500, 20.0300]]] }
        },
        {
          "type": "Feature",
          "properties": { "name": "四川" },
          "geometry": { "type": "Polygon", "coordinates": [[[104.0700, 30.6700], [104.0733, 30.6700], [104.0733, 30.6733], [104.0700, 30.6733], [104.0700, 30.6700]]] }
        },
        {
          "type": "Feature",
          "properties": { "name": "贵州" },
          "geometry": { "type": "Polygon", "coordinates": [[[106.7100, 26.5700], [106.7133, 26.5700], [106.7133, 26.5733], [106.7100, 26.5733], [106.7100, 26.5700]]] }
        },
        {
          "type": "Feature",
          "properties": { "name": "云南" },
          "geometry": { "type": "Polygon", "coordinates": [[[102.8300, 24.8800], [102.8333, 24.8800], [102.8333, 24.8833], [102.8300, 24.8833], [102.8300, 24.8800]]] }
        },
        {
          "type": "Feature",
          "properties": { "name": "西藏" },
          "geometry": { "type": "Polygon", "coordinates": [[[91.1100, 29.6500], [91.1133, 29.6500], [91.1133, 29.6533], [91.1100, 29.6533], [91.1100, 29.6500]]] }
        },
        {
          "type": "Feature",
          "properties": { "name": "陕西" },
          "geometry": { "type": "Polygon", "coordinates": [[[108.9300, 34.2700], [108.9333, 34.2700], [108.9333, 34.2733], [108.9300, 34.2733], [108.9300, 34.2700]]] }
        },
        {
          "type": "Feature",
          "properties": { "name": "甘肃" },
          "geometry": { "type": "Polygon", "coordinates": [[[103.8300, 36.0600], [103.8333, 36.0600], [103.8333, 36.0633], [103.8300, 36.0633], [103.8300, 36.0600]]] }
        },
        {
          "type": "Feature",
          "properties": { "name": "青海" },
          "geometry": { "type": "Polygon", "coordinates": [[[101.7700, 36.6200], [101.7733, 36.6200], [101.7733, 36.6233], [101.7700, 36.6233], [101.7700, 36.6200]]] }
        },
        {
          "type": "Feature",
          "properties": { "name": "宁夏" },
          "geometry": { "type": "Polygon", "coordinates": [[[106.2700, 38.4600], [106.2733, 38.4600], [106.2733, 38.4633], [106.2700, 38.4633], [106.2700, 38.4600]]] }
        },
        {
          "type": "Feature",
          "properties": { "name": "新疆" },
          "geometry": { "type": "Polygon", "coordinates": [[[87.6200, 43.8200], [87.6233, 43.8200], [87.6233, 43.8233], [87.6200, 43.8233], [87.6200, 43.8200]]] }
        },
        {
          "type": "Feature",
          "properties": { "name": "台湾" },
          "geometry": { "type": "Polygon", "coordinates": [[[121.5000, 25.0300], [121.5033, 25.0300], [121.5033, 25.0333], [121.5000, 25.0333], [121.5000, 25.0300]]] }
        },
        {
          "type": "Feature",
          "properties": { "name": "香港" },
          "geometry": { "type": "Polygon", "coordinates": [[[114.1700, 22.3200], [114.1733, 22.3200], [114.1733, 22.3233], [114.1700, 22.3233], [114.1700, 22.3200]]] }
        },
        {
          "type": "Feature",
          "properties": { "name": "澳门" },
          "geometry": { "type": "Polygon", "coordinates": [[[113.5400, 22.1900], [113.5433, 22.1900], [113.5433, 22.1933], [113.5400, 22.1933], [113.5400, 22.1900]]] }
        }
      ]
    };
    
    try {
      if (localChinaGeoJson && localChinaGeoJson.features) {
        // 同时将本地数据存入缓存，以便后续使用
        localStorage.setItem(CACHE_KEY, JSON.stringify(localChinaGeoJson));
        return localChinaGeoJson;
      }
    } catch (e) {
      console.warn('Local GeoJSON data error, falling back to other sources:', e);
    }
    
    // 2. 检查缓存
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        localStorage.removeItem(CACHE_KEY);
      }
    }

    const urls = [
      'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json',
      'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/asset/geo/china.json',
      'https://raw.githubusercontent.com/apache/echarts/master/test/data/map/json/china.json',
      'https://unpkg.com/china-atlas@0.0.1/china.json'
    ];

    for (const url of urls) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000); // 6秒超时

        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          // 如果数据合法，存入缓存
          if (data && (data.features || data.objects)) {
            localStorage.setItem(CACHE_KEY, JSON.stringify(data));
            return data;
          }
        }
      } catch (e) {
        console.warn(`Source ${url} failed, trying next...`);
      }
    }
    throw new Error('所有数据源均无法访问，请检查您的网络连接。');
  };

  const initMap = async () => {
    if (!chartRef.current) return;
    setLoadingStatus('loading');
    
    try {
      const geoData = await fetchGeoJson();
      
      // 确保实例被销毁重建，避免容器尺寸变化导致的绘制错误
      if (chartInstance) {
        chartInstance.dispose();
      }

      const chart = echarts.init(chartRef.current);
      setChartInstance(chart);

      echarts.registerMap('china', geoData);
      setLoadingStatus('success');
      chart.setOption(getOption());
    } catch (e: any) {
      console.error(e);
      setErrorMsg(e.message || '地图引擎初始化失败');
      setLoadingStatus('error');
    }
  };

  const getOption = () => ({
    backgroundColor: 'transparent',
    tooltip: {
      show: true,
      trigger: 'item',
      backgroundColor: 'rgba(255, 255, 255, 0.98)',
      borderRadius: 8, // 简化圆角
      padding: [8, 12], // 减少内边距
      borderWidth: 0,
      shadowBlur: 5, // 降低阴影模糊度
      shadowColor: 'rgba(0,0,0,0.05)', // 简化阴影
      formatter: (params: any) => {
        if (!params.data) return '';
        return `
          <div style="font-family: 'Noto Sans SC';">
            <div style="color: #10b981; font-weight: bold; font-size: 14px; margin-bottom: 2px;">${params.data.city} · ${params.name}</div>
            <div style="color: #64748b; font-size: 12px;">摘帽时间：<span style="color: #34d399; font-weight: 800;">${params.data.year}年</span></div>
          </div>
        `;
      }
    },
    visualMap: {
      min: 2016,
      max: 2020,
      calculable: true,
      dimension: 2,
      orient: 'horizontal',
      left: 'center',
      bottom: 40,
      itemWidth: 12, // 减小滑块宽度
      itemHeight: 150, // 减小滑块高度
      text: ['2020', '2016'], // 简化文本
      textStyle: { color: '#64748b', fontWeight: '400', fontSize: 12 }, // 简化文本样式
      inRange: {
        // 优化颜色映射，使用更直观的绿色渐变
        color: ['#D1FAE5', '#A7F3D0', '#6EE7B7', '#34D399', '#10B981']
      },
      // 关闭visualMap动画
      animation: false
    },
    geo: {
      map: 'china',
      roam: true,
      zoom: 1.1,
      center: [104.5, 36.5],
      label: { show: false },
      itemStyle: {
        areaColor: '#F8FAFC',
        borderColor: '#CBD5E1',
        borderWidth: 0.5, // 减小边框宽度
      },
      emphasis: {
        itemStyle: { areaColor: '#F1F5F9' },
        label: { show: false }
      },
      // 移除不必要的性能优化，简化配置
    },
    series: [{
      name: '脱贫县',
      type: 'effectScatter', // 恢复effectScatter，实现点亮动画效果
      coordinateSystem: 'geo',
      data: [],
      // 适当调整symbolSize，平衡视觉效果和性能
      symbolSize: (val: any) => {
        const year = val[2];
        // 2020年的数据点最大，2016年最小，形成直观的大小对比
        return 3 + (year - 2015) * 1.5;
      },
      // 增强脉动效果，让脱贫县更加醒目
      rippleEffect: {
        brushType: 'stroke',
        scale: 4, // 增大缩放比例，增强视觉效果
        period: 4, // 调整周期，让脉动更流畅
        color: (val: any) => {
          // 根据脱贫年份动态调整脉动颜色
          const year = val[2];
          const colors = ['#34D399', '#10B981', '#059669', '#047857', '#065F46'];
          const index = Math.min(Math.floor(year - 2016), colors.length - 1);
          return colors[index];
        }
      },
      itemStyle: { 
        shadowBlur: 8, // 增强阴影效果，提升立体感
        shadowColor: (val: any) => {
          // 根据脱贫年份动态调整阴影颜色
          const year = val[2];
          const colors = ['rgba(52, 211, 153, 0.3)', 'rgba(16, 185, 129, 0.3)', 'rgba(5, 150, 105, 0.3)', 'rgba(4, 120, 87, 0.3)', 'rgba(6, 95, 70, 0.3)'];
          const index = Math.min(Math.floor(year - 2016), colors.length - 1);
          return colors[index];
        },
        opacity: 0.95 // 提高不透明度，让数据点更清晰
      },
      // 启用hover动画，增强交互体验
      hoverAnimation: true,
      // 优化动画配置，实现更自然的渐入效果
      animation: true,
      animationDuration: 2000, // 延长动画时长，让效果更流畅
      animationDelay: (idx: number, data: any) => {
        // 根据数据点的脱贫年份和索引计算动画延迟，实现错落有致的点亮效果
        const year = data.value[2];
        const yearDelay = (year - 2015) * 200; // 不同年份的数据点有明显的时间差
        const indexDelay = idx % 15 * 40; // 同一年份的数据点分批进入
        return yearDelay + indexDelay;
      },
      animationEasing: 'easeOutElastic', // 使用弹性缓动，让动画更生动
      animationEasingUpdate: 'cubicOut',
      // 使用z，比zlevel性能更好
      z: 1,
      // 优化渲染性能
      large: true,
      largeThreshold: 1000
    }]
  });

  // 3. 页面挂载与 Resize 监听 - 只保留ResizeObserver，移除window.resize
  useEffect(() => {
    initMap();

    // 只使用ResizeObserver监听容器大小变化，更精准且性能更好
    let resizeObserver: ResizeObserver | null = null;
    if (chartRef.current) {
      resizeObserver = new ResizeObserver(() => {
        chartInstance?.resize();
      });
      resizeObserver.observe(chartRef.current);
    }
    
    return () => {
      resizeObserver?.disconnect();
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [chartInstance]);

  // 4. 优化的播放动画逻辑 - 平衡流畅度和性能
  useEffect(() => {
    if (isPlaying) {
      let lastUpdateTime = 0;
      const fps = 20; // 调整为20fps，提高动画流畅度
      const interval = 1000 / fps;
      const step = 0.05; // 减小时间步长，实现更平滑的过渡

      const animate = (timestamp: number) => {
        if (timestamp - lastUpdateTime >= interval) {
          setTimelineProgress(prev => {
            const next = prev + step;
            if (next >= 2021) {
              setIsPlaying(false);
              return 2021;
            }
            return next;
          });
          lastUpdateTime = timestamp;
        }
        animationFrameRef.current = requestAnimationFrame(animate);
      };
      animationFrameRef.current = requestAnimationFrame(animate);
    } else if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, [isPlaying]);

  // 5. 数据采样函数，减少同时显示的数据点数量
  const sampleData = (data: DataPoint[]) => {
    // 如果数据量小于100，全部显示
    if (data.length <= 100) {
      return data;
    }
    // 否则按比例采样，最多显示300个点
    const sampleRate = Math.min(1, 300 / data.length);
    return data.filter(() => Math.random() < sampleRate);
  };

  // 6. 优化的数据处理逻辑，确保数据点按时间顺序显示
  const processedData = useMemo(() => {
    // 首先根据时间线进度过滤数据，只显示已到脱贫时间的数据
    let filtered = allData.filter(d => {
      // 使用整数年份进行比较，确保同一年份的数据同时显示
      const dataYear = Math.floor(d.sortValue);
      const currentYear = Math.floor(timelineProgress);
      return dataYear <= currentYear;
    });
    
    // 对数据进行采样，减少渲染负担
    const sampledData = sampleData(filtered);
    
    // 确保数据点按照脱贫年份排序，实现按时间顺序点亮
    return sampledData.sort((a, b) => a.sortValue - b.sortValue);
  }, [allData, timelineProgress]);

  // 7. 优化的数据渲染逻辑
  useEffect(() => {
    if (!chartInstance || allData.length === 0 || loadingStatus !== 'success') return;
    
    // 使用处理后的数据，减少渲染开销
    chartInstance.setOption({
      title: {
        text: timelineProgress < 2016 ? '暖阳正在播种...' : `${Math.floor(timelineProgress)}年 · 生机版图`,
        subtext: `累计点亮脱贫县：${processedData.length} 个`,
        left: 'center',
        top: 25,
        textStyle: { color: '#065F46', fontSize: 32, fontWeight: '900', fontFamily: 'Noto Serif SC' },
        subtextStyle: { color: '#10B981', fontSize: 16, fontWeight: '600' }
      },
      series: [{ data: processedData }]
    });
  }, [processedData, timelineProgress, chartInstance, loadingStatus]);

  return (
    <div className="w-full min-h-screen bg-[#FDFDFB] py-12 px-4 md:px-10">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-100 shadow-sm mb-5">
          <Sun className="w-3.5 h-3.5 animate-pulse" />
          数字纪实 · 见证奇迹
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4 font-serif-sc">大地回春 · 生机版图</h1>
        <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto font-medium">
          点击播放按钮，见证五年间点点星火如何点亮神州大地。
        </p>
      </div>

      <div className="relative max-w-[1300px] mx-auto bg-white rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden ring-1 ring-slate-200/50">
        
        {/* 加载中状态 */}
        {loadingStatus === 'loading' && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm">
            <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mb-4" />
            <p className="text-emerald-700 font-bold tracking-widest text-sm">正在努力加载地图数据...</p>
          </div>
        )}

        {/* 错误提示状态 */}
        {loadingStatus === 'error' && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/95">
            <div className="bg-red-50 p-8 rounded-[2rem] border border-red-100 flex flex-col items-center max-w-md text-center">
              <AlertCircle className="w-16 h-16 text-red-400 mb-4" />
              <h3 className="text-red-900 font-bold text-xl mb-2">地图数据无法显示</h3>
              <p className="text-red-600/70 text-sm mb-6 leading-relaxed">{errorMsg}</p>
              <button 
                onClick={() => { localStorage.clear(); initMap(); }}
                className="px-8 py-3 bg-red-500 text-white rounded-2xl hover:bg-red-600 transition-all shadow-lg shadow-red-100 font-bold flex items-center gap-2"
              >
                <RefreshCw size={18} /> 清理缓存并重试
              </button>
            </div>
          </div>
        )}

        <div ref={chartRef} className="w-full h-[700px] md:h-[750px]" />

        {/* 控制面板 */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-white/90 backdrop-blur-xl px-10 py-5 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-white z-30 ring-1 ring-slate-100">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={loadingStatus !== 'success'}
            className={`w-14 h-14 flex items-center justify-center rounded-2xl transition-all ${isPlaying ? 'bg-emerald-50 text-emerald-500' : 'bg-emerald-600 text-white shadow-xl shadow-emerald-200 hover:scale-105 active:scale-95 disabled:bg-slate-100 disabled:text-slate-300'}`}
          >
            {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
          </button>
          
          <div className="flex flex-col min-w-[200px]">
            <div className="flex justify-between items-end mb-1.5">
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Time Cycle</span>
              <span className="text-2xl font-black text-slate-800 tabular-nums leading-none">
                {timelineProgress < 2016 ? '2015' : Math.min(Math.floor(timelineProgress), 2020)}
                <span className="text-xs ml-1 font-bold text-slate-300">年</span>
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-50 rounded-full overflow-hidden p-[2px] ring-1 ring-slate-100">
              <div 
                className="h-full bg-gradient-to-r from-amber-300 via-emerald-300 to-emerald-500 rounded-full transition-all duration-100 ease-linear"
                style={{ width: `${Math.max(0, Math.min(100, ((timelineProgress - 2015.5) / 5.5) * 100))}%` }}
              ></div>
            </div>
          </div>

          <div className="h-8 w-px bg-slate-100 mx-1"></div>

          <button 
            onClick={() => { setIsPlaying(false); setTimelineProgress(2015.5); }}
            className="p-3 text-slate-300 hover:text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all"
          >
            <RefreshCw size={22} />
          </button>
        </div>

        {/* 侧边说明 */}
        <div className="absolute top-10 left-10 hidden lg:block w-64 bg-white/60 backdrop-blur-md p-6 rounded-[2rem] border border-white shadow-sm ring-1 ring-slate-100">
          <div className="mb-5">
            <h4 className="text-emerald-900 font-black text-base mb-2 flex items-center gap-2">
              <Sprout className="w-4 h-4 text-emerald-500" /> 图例说明
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
              圆点越大表示摘帽时间越晚，颜色越绿代表生机越旺。
            </p>
          </div>
          <div className="space-y-4">
            {[
              { color: 'bg-amber-300', label: '2016-17', desc: '初步脱贫' },
              { color: 'bg-emerald-300', label: '2018-19', desc: '稳步推进' },
              { color: 'bg-emerald-500', label: '2020', desc: '全面摘帽' },
            ].map(item => (
              <div key={item.label} className="flex gap-3 items-center">
                <div className={`w-3 h-3 rounded-full ${item.color} shadow-sm ring-2 ring-white`} />
                <div>
                  <div className="text-xs font-bold text-slate-700">{item.label}</div>
                  <div className="text-[10px] text-slate-400">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapDashboard;
