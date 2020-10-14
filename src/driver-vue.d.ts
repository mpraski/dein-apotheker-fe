// driver.d.ts

import Vue from 'vue'
import { Driver } from './driver'

declare module 'vue/types/vue' {
    interface Vue {
        $driver: Driver;
    }
}
