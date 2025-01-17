/// <reference types="@tarojs/taro" />
/// <reference types="@bhb-frontend/service-types" />

declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.styl';

declare namespace NodeJS {
  interface ProcessEnv {
    TARO_ENV:
      | 'weapp'
      | 'swan'
      | 'alipay'
      | 'h5'
      | 'rn'
      | 'tt'
      | 'quickapp'
      | 'qq'
      | 'jd';
    NODE_ENV: 'development' | 'production';
    API_ENV: 'test' | 'gray' | 'prod';
    APP_NAME: 'tt' | 'wx';
  }
}

declare module 'cos-wx-sdk-v5';

type NonFunctionKeys<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in keyof T]: T[K] extends (...args: any[]) => any ? never : K;
}[keyof T];

/**
 * 获取除对象除方法的属性
 * 适用场景： store的update方法的参数类型定义
 *  */
declare type NonFunctionProps<T> = Pick<T, NonFunctionKeys<T>>;
