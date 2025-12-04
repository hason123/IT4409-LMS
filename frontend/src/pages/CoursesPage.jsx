import React from 'react'
import Header from '../components/shared/Header'
import CourseCard from '../components/CourseCard'
import CourseFilters from '../components/CourseFilters'
import { Select } from 'antd'

const sampleCourses = [
  { id: 1, title: 'Complete Web Development Bootcamp', author: 'Dr. Angela Yu', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZlF95kIMvRxO1c3xvW5Od-BDxzPIgrZx6k-Pc989zr7t5K3zxVuHbkFnClplI0MA6eEea_xiEg-OdiQ2YEUkm5kuBSEyKkTERJA3-cODcBXAhJZrEYhlUhmtlxMvNB-Z9gUlV6ApvHTYjopsu-X3kO0ZruggAHqJO49SG0WMokZYf30ATvj9XdXLMHJHGzsyrSaR4sg0zHuHnQc32jcISQWdzaivF4tMcD2zLNdqRZ7dDM1z7yYqo-s2AjrgnDow1hN3FwYIHHg0', rating: 4.8, reviews: '12,345' },
  { id: 2, title: 'The Data Science Course 2024: Complete', author: '365 Careers', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgUNTvP0H0wr2P2S95XxoCJhQz6RkKCpeEVS2fND9GWhTLjqwGEY7golIkrdXAuDpqrUJZhpYvSNClHVbAb9v2gufhYiVQPXzjwANGtXY25WWhHMpbQ-TLdgFabJ3zJhAk_Sg1vOoXfLIBpvIm3oxasS27L0KUBAN_FiLgNXmqGvh9pJ9LHiOR3k1aC_mPYWG-2Am3GBdvTpzJfU02zygPDsMmsM2p7s6vcoseyl5qvBB0r2MLRx_m74A1s28HFoR1R3W9bhtRhwU', rating: 4.7, reviews: '9,876' },
  { id: 3, title: 'UI/UX Design Essentials in Figma', author: 'Daniel Scott', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAm6KrMYTf28Hzo1efhV4hqALrRNRDD2Yzafr9xXDsOa0bT_99R3MW0pcyuqCGBOWDJiXdaINrBZ6sdR_zSWENCkqVGwpyxFwUIf4ZCe80iRwh-0Dww_VvBhl8eKybPM-9DoP5epN0WumA_k6W-_dbtavN3Wf8mYovG8n8HDml5iLzlPOAYs8qrLh-UoKLTTwDPx9pMYizLy_AhT_mJi3sEsF0Kl_dOMpKhXLxDj08dddn6Zpo6XUG7kbPpKZPacNsXZR_-pygVkg4', rating: 4.9, reviews: '5,432' },
  { id: 4, title: 'The Complete Digital Marketing Course', author: 'Rob Percival', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApNfmsHDAgY_yWNnafna7caCHaT-SdlppC_fXg6yqVMuC9K6H-T9W2hX4kd6erbj5epl17vU3AU45nWBZTqTOvFrQJm3DAZiDJcLYcORWnNYZkSoMeFBmDpoWt_fbNVonhmADzTJvDM8IaWUt17XphIMPANNoKZWgsHjfXy0nCuzLlcMOXdc-Mo95Cz-xmjUVXQpiAgIOCpc_3WD4xUALFH14Y3BUwCCD9dsAE5DXGnkTwzmTf5PDtgU4O1TsLn34zK4wa-gWadx0', rating: 4.6, reviews: '21,500' },
  { id: 5, title: '100 Days of Code: The Complete Python Pro', author: 'Jose Portilla', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAWA9sVUSjMDk_C6uoruYqSSYEPUNq1Nlj1TBc2fNVI7ZlQPpNXzs-37HUN9WCu2Q4NtsmCelbg8LO9dk2y1ObcLokLJ2SRUlirfmEgmONAEpyziHo36RTTtJzAJGLDuPqnVC5AsyxaVIJKyJInkjzvXEx3Ml0rrY8A0BLwXUXLHcbk451Qv0QB9VGAb_rDb15-3aWChWxfdaZDlCd5mLRlOyzvqF5tCZ8Pv6PVgYXyv6-8E84tCMJkVlffHdb76M2rihcNyMokUo', rating: 4.8, reviews: '35,123' },
  { id: 6, title: 'React - The Complete Guide', author: 'Maximilian Schwarzmüller', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBs2fcRufsqig4RLRJ2PXFHpbCBsvjksnCTjzG7wPdAUBh6PGvcjkkmNk4UQmbBuKh981XAfOOHwrxWBKZzO3IHPI4c0wwDeyHog-wQBoYRlMBTslPS_6NC5sm1M-swcRHxrkz_MSAeqGYD7uwHeVAl29g_8P7V0df1NC_ToP3WSPL2yHcz2e7qKMULoaaMdyJckLxgkJPTxAshqUdgfSeRwHXnXqXb5ThsRHILBY2nQ8Lr0G1yvcBaE5yTt9eQTTqV4k8rvC7hG8I', rating: 4.7, reviews: '41,888' }
]

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-[#111418] dark:text-white">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <p className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Tất cả khóa học</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="w-full lg:w-1/4 xl:w-1/5 shrink-0">
              <CourseFilters />
            </aside>

            <div className="w-full lg:w-3/4 xl:w-4/5">
              <div className="flex flex-col sm:flex-row justify-between items-baseline mb-6 gap-4">
                <h2 className="text-gray-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">Hiển thị {sampleCourses.length} kết quả:</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Sắp xếp theo:</span>
                  <Select
                    defaultValue="popular"
                    options={[
                      { value: 'popular', label: 'Phổ biến nhất' },
                      { value: 'newest', label: 'Mới nhất' }
                    ]}
                    className="text-sm font-medium rounded-lg w-40 h-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {sampleCourses.map(c => (
                  <CourseCard key={c.id} title={c.title} author={c.author} image={c.image} rating={c.rating} reviews={c.reviews} />
                ))}
              </div>

              <div className="flex justify-center mt-10">
                <nav aria-label="Pagination" className="flex items-center gap-2">
                  <button className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <span className="material-symbols-outlined !text-xl">chevron_left</span>
                  </button>
                  <button className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-primary text-white font-bold">1</button>
                  <button className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-700">2</button>
                  <span className="inline-flex items-center justify-center h-9 w-9 text-gray-500">...</span>
                  <button className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-700">10</button>
                  <button className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <span className="material-symbols-outlined !text-xl">chevron_right</span>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
