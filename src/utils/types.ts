import { UserModel } from '@/models/user'
import { types } from 'joi'

export interface TCourse {
  thumbnail: string
  title: string
  tag: string
  price: string
  summary: string
  intro: string
  purpose: string
  target: string
  category: string
  video_uid: string
  slug?: string
  path: string
  duration?: string
}

export type TCourseRocommend = Pick<
  TCourse,
  'title' | 'intro' | 'tag' | 'price' | 'thumbnail' | 'path'
>

export type TMyCourse = Pick<TCourse, 'title' | 'path' | 'video_uid'>

export interface Footer {
  meta: string
  apple: string
  google: string
}

export interface Agreements {
  allAgreements: boolean
  over14: boolean
  serviceTerms: boolean
  privacyPolicy: boolean
  [key: string]: boolean
}

export type SessionUser = Omit<
  UserModel,
  'password' | 'isVerified' | 'isInit' | 'validationCode'
>

export interface Main {
  banner: {
    banner_image: string
    title: string
    intro: string
  }
  contents: {
    title: string
    description: string
    intro_image: string
  }[]
}

export interface Experience {
  banner: {
    banner_image: string
    title: string
    intro: string
  }
  contents: {
    title: string
    thumbnail: string
    path: string
  }[]
}

export type TExperienceContents = Omit<Experience, 'banner'>

export interface LabKid {
  banner: {
    title: string
    season: string[]
    banner_image: string
    intro: string
  }
  contents: {
    title: string
    job_intro: { future_job?: string; current_job: string }
    contents_format: string
    motivation: string
    tag: string
    synopsis: {
      title: string
      sub_title?: string
      description: string
    }
    video_uid: string
  }[]
}

export type TLabKidContents = Omit<LabKid, 'banner'>

export interface TTutorial {
  text?: string
  select?: string[]
  select_image?: string[]
  who?: string
}
