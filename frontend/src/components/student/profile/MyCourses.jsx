import React from "react";
import CourseCard from "../../course/CourseCard";

export default function MyCourses() {
  // Sample data for My Courses
  const myCourses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      author: "Dr. Angela Yu",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCZlF95kIMvRxO1c3xvW5Od-BDxzPIgrZx6k-Pc989zr7t5K3zxVuHbkFnClplI0MA6eEea_xiEg-OdiQ2YEUkm5kuBSEyKkTERJA3-cODcBXAhJZrEYhlUhmtlxMvNB-Z9gUlV6ApvHTYjopsu-X3kO0ZruggAHqJO49SG0WMokZYf30ATvj9XdXLMHJHGzsyrSaR4sg0zHuHnQc32jcISQWdzaivF4tMcD2zLNdqRZ7dDM1z7yYqo-s2AjrgnDow1hN3FwYIHHg0",
      rating: 4.8,
      reviews: "12,345",
    },
    {
      id: 3,
      title: "UI/UX Design Essentials in Figma",
      author: "Daniel Scott",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAm6KrMYTf28Hzo1efhV4hqALrRNRDD2Yzafr9xXDsOa0bT_99R3MW0pcyuqCGBOWDJiXdaINrBZ6sdR_zSWENCkqVGwpyxFwUIf4ZCe80iRwh-0Dww_VvBhl8eKybPM-9DoP5epN0WumA_k6W-_dbtavN3Wf8mYovG8n8HDml5iLzlPOAYs8qrLh-UoKLTTwDPx9pMYizLy_AhT_mJi3sEsF0Kl_dOMpKhXLxDj08dddn6Zpo6XUG7kbPpKZPacNsXZR_-pygVkg4",
      rating: 4.9,
      reviews: "5,432",
    },
    {
      id: 6,
      title: "React - The Complete Guide",
      author: "Maximilian Schwarzmüller",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBs2fcRufsqig4RLRJ2PXFHpbCBsvjksnCTjzG7wPdAUBh6PGvcjkkmNk4UQmbBuKh981XAfOOHwrxWBKZzO3IHPI4c0wwDeyHog-wQBoYRlMBTslPS_6NC5sm1M-swcRHxrkz_MSAeqGYD7uwHeVAl29g_8P7V0df1NC_ToP3WSPL2yHcz2e7qKMULoaaMdyJckLxgkJPTxAshqUdgfSeRwHXnXqXb5ThsRHILBY2nQ8Lr0G1yvcBaE5yTt9eQTTqV4k8rvC7hG8I",
      rating: 4.7,
      reviews: "41,888",
    },
  ];

  return (
    <>
      <div className="flex flex-wrap justify-between items-center gap-4 pb-6 border-b border-black/10 dark:border-white/10">
        <div className="flex min-w-72 flex-col gap-2">
          <p className="text-3xl font-bold tracking-tight text-[#111418] dark:text-white">
            Khóa học của tôi
          </p>
          <p className="text-[#617589] dark:text-gray-400 text-base font-normal leading-normal">
            Tiếp tục học các khóa học bạn đã đăng ký.
          </p>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {myCourses.map((c) => (
            <CourseCard
              key={c.id}
              id={c.id}
              title={c.title}
              author={c.author}
              image={c.image}
              rating={c.rating}
              reviews={c.reviews}
            />
          ))}
        </div>
      </div>
    </>
  );
}
