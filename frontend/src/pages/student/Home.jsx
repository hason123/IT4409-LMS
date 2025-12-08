import React from 'react'
import Header from '../../components/layout/Header'
import CourseCard from '../../components/course/CourseCard'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-[#111418] dark:text-white">
      <Header />
      <main className="flex-1">
        <section className="flex justify-center py-10 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-7xl">
            <div className="container mx-auto">
              <div className="flex flex-col-reverse gap-8 lg:flex-row lg:items-center">
                <div className="flex flex-col gap-6 w-full lg:w-1/2 lg:justify-center">
                  <div className="flex flex-col gap-4 text-left">
                    <h1 className="text-4xl font-black leading-tight lg:text-5xl text-[#111418] dark:text-white">Nâng tầm kỹ năng của bạn ngay hôm nay</h1>
                    <h2 className="text-base text-slate-600 dark:text-slate-300">Tham gia cùng hàng ngàn học viên và bắt đầu hành trình chinh phục kiến thức với các khóa học chất lượng cao từ những chuyên gia hàng đầu.</h2>
                  </div>
                  <button className="group flex min-w-[84px] max-w-[480px] w-fit cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-bold gap-2"
                    onClick={() => navigate('/courses')}>
                    <span>Khám phá các khóa học</span>
                    <ArrowRightIcon className="h-4 w-4 transform transition-transform duration-200 group-hover:translate-x-2" />
                  </button>
                </div>
                <div className="w-full lg:w-1/2 bg-center bg-no-repeat aspect-video bg-cover rounded-xl" style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuBsBflg-7NULKvHD8od6_IRJSOIerdq3F5uBjqNwjpYk7qMmOxXgPodPszPJyyCUf_luVmTHVOn17QLSMZZSFKId8pjQATSbyqWagwO3kW5TDg8nm9lBEedZx5JURm9Of3s63cc099CZwJqcW_M0uQdDZRketFz-0sVhO1iC0WffnQ-K3fXRI4UdDXK-wVQXHwq7YWXWoox7avcvI2Z__hH16kUB4CaflI6EBlZpT3orta1vadps8UJH_mMqXXnKimFvxuSgkv-oKY)' }} />
              </div>
            </div>
          </div>
        </section>

        <section className="flex justify-center py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col w-full max-w-7xl">
            <h2 className="text-3xl font-bold leading-tight px-4 pb-6 text-[#111418] dark:text-white">Khóa học nổi bật</h2>
            <div className="flex overflow-x-auto -mx-4 scrollbar-hide p-4 gap-6">
              <CourseCard title="Lập trình Python từ A-Z" author="David Lee" image="https://lh3.googleusercontent.com/aida-public/AB6AXuCfD-fWit_3AeqC8pJ15UQIPvprKcQceL26YH9rQyHXGquY7WGPMKBo3NvJCndm9qWnAyXE-JzYQ04M1WGNF0IJb69Dc8QHwyH11LSbR01deQHB0W_m3OqWE_CPu871mRTY8EKsCq4QKe4v3uCVFJsuHcoO19vsFq-4kB6AVQGEPrUpLX3AbNbYlBVvk_9hbA_hto8EkQ41KS1IXth0LCEHsIsDuDnPeqZtoMVrKJCl8gKT9AcHJ2HKBxrI_mV4qdut2-1oUfjEkD4" />
              <CourseCard title="Digital Marketing 101" author="Sophia Chen" image="https://lh3.googleusercontent.com/aida-public/AB6AXuDebluiKD58d8uQuaMBGD-xMo9yeAWGN91qCKPdXlVA1-mHwhhPaeg-5dai34Xov9mUVrssbSwVSpxqKME5gdAfV9brcs6U1-MNYA1bg_THAEAc_otZ7mdxKiR9Fhf5plr3oM1BbSLWXd10ETOG_CigywoAAEAZhTBj7T0nXj_corSxGByHYFUCuQAdj1Jy6hAIR8L88LBzTwwt0ioX_FZlcDiptDvh7HmJmK8wTQlrhEGM_oUQBwixjU0k_Fd4vNK95D7vJaI6288" />
              <CourseCard title="Thiết kế UI/UX cho ứng dụng" author="Michael Brown" image="https://lh3.googleusercontent.com/aida-public/AB6AXuDbNZqSr9tAeugmnYLzWtP--wvyZSLgW76WodBgWCygQIzdnIjXfuzvybqNQeFhlcRM0xaHPxOf7aX5Z8Y6-nMM8qwRBysMUDdOvribbxH_88DruqEEM5Oyro1DFU5P0xhKtnf671Geal0ejbnJgJ7Pq4soOJQR4RVglHAKvGeDI2rotpGkzWqTHfuEH8dZh_2evM5wXe-NpOVqWOAOOZiHNcwDVtKo1pT0EMatyQ6nZkBepOWw2ysirPFsfrVrOt3Oyhw_q-iGUYM" />
            </div>
          </div>
        </section>

        <section className="flex justify-center py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col w-full max-w-7xl">
            <h2 className="text-3xl font-bold leading-tight px-4 pb-6 text-[#111418] dark:text-white">Danh mục khóa học</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
              <div className="flex items-center gap-4 rounded-xl p-4 bg-white dark:bg-slate-800/50 shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-center size-12 rounded-lg bg-primary/20 text-primary">
                  <span className="material-symbols-outlined !text-3xl">code</span>
                </div>
                <span className="font-bold text-lg text-[#111418] dark:text-white">Lập trình</span>
              </div>
              <div className="flex items-center gap-4 rounded-xl p-4 bg-white dark:bg-slate-800/50 shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-center size-12 rounded-lg bg-primary/20 text-primary">
                  <span className="material-symbols-outlined !text-3xl">campaign</span>
                </div>
                <span className="font-bold text-lg text-[#111418] dark:text-white">Marketing</span>
              </div>
              <div className="flex items-center gap-4 rounded-xl p-4 bg-white dark:bg-slate-800/50 shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-center size-12 rounded-lg bg-primary/20 text-primary">
                  <span className="material-symbols-outlined !text-3xl">design_services</span>
                </div>
                <span className="font-bold text-lg text-[#111418] dark:text-white">Thiết kế</span>
              </div>
              <div className="flex items-center gap-4 rounded-xl p-4 bg-white dark:bg-slate-800/50 shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-center size-12 rounded-lg bg-primary/20 text-primary">
                  <span className="material-symbols-outlined !text-3xl">translate</span>
                </div>
                <span className="font-bold text-lg text-[#111418] dark:text-white">Ngoại ngữ</span>
              </div>
            </div>
          </div>
        </section>

        <section className="flex justify-center py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center w-full max-w-7xl gap-10">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.015em] text-[#111418] dark:text-white">Tại sao chọn LearnOnline?</h2>
              <p className="text-slate-600 dark:text-slate-300 max-w-2xl">Chúng tôi cung cấp một môi trường học tập linh hoạt và hiệu quả, giúp bạn đạt được mục tiêu nhanh hơn.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              <div className="flex flex-col items-center gap-4 text-center p-6 rounded-xl bg-white dark:bg-slate-800/50">
                <div className="flex items-center justify-center size-16 rounded-full bg-primary/20 text-primary">
                  <span className="material-symbols-outlined !text-4xl">schedule</span>
                </div>
                <h3 className="text-xl font-bold text-[#111418] dark:text-white">Học mọi lúc, mọi nơi</h3>
                <p className="text-slate-600 dark:text-slate-300">Truy cập khóa học từ bất kỳ thiết bị nào, học theo lịch trình của riêng bạn.</p>
              </div>
              <div className="flex flex-col items-center gap-4 text-center p-6 rounded-xl bg-white dark:bg-slate-800/50">
                <div className="flex items-center justify-center size-16 rounded-full bg-primary/20 text-primary">
                  <span className="material-symbols-outlined !text-4xl">school</span>
                </div>
                <h3 className="text-xl font-bold text-[#111418] dark:text-white">Giảng viên hàng đầu</h3>
                <p className="text-slate-600 dark:text-slate-300">Học hỏi từ các chuyên gia có kinh nghiệm thực tế trong ngành.</p>
              </div>
              <div className="flex flex-col items-center gap-4 text-center p-6 rounded-xl bg-white dark:bg-slate-800/50">
                <div className="flex items-center justify-center size-16 rounded-full bg-primary/20 text-primary">
                  <span className="material-symbols-outlined !text-4xl">route</span>
                </div>
                <h3 className="text-xl font-bold text-[#111418] dark:text-white">Lộ trình cá nhân hóa</h3>
                <p className="text-slate-600 dark:text-slate-300">Xây dựng lộ trình học tập phù hợp với mục tiêu và trình độ của bạn.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
