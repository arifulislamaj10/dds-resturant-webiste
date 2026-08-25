import { testimonials } from "@/config/site";

export function Testimonials() {
  return (
    <section id="reviews" className="section-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label mx-auto w-fit">Reviews</p>
          <h2 className="section-title mt-3">Loved by our customers</h2>
          <p className="section-subtitle mx-auto">
            100% recommended on Facebook. Here&apos;s what people say about DD&apos;s.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((review) => (
            <blockquote
              key={review.name}
              className="surface-card !rounded-3xl p-6 sm:p-7"
            >
              <div className="flex gap-0.5 text-brand-secondary">
                {Array.from({ length: review.rating }).map((_, index) => (
                  <span key={index} aria-hidden="true" className="text-lg">
                    ★
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-stone-600 sm:text-base">
                &ldquo;{review.text}&rdquo;
              </p>
              <footer className="mt-5 border-t border-stone-100 pt-4 text-sm font-bold text-brand-black">
                {review.name}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
