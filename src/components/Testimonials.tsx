import { testimonials } from "@/config/site";

export function Testimonials() {
  return (
    <section id="reviews" className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-brand-flame">Reviews</p>
          <h2 className="mt-2 text-2xl font-bold text-brand-black sm:text-3xl lg:text-4xl">
            What our customers say
          </h2>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {testimonials.map((review) => (
            <blockquote
              key={review.name}
              className="rounded-2xl border border-stone-200 bg-brand-muted p-5 sm:rounded-3xl sm:p-6"
            >
              <div className="flex gap-1 text-brand-flame">
                {Array.from({ length: review.rating }).map((_, index) => (
                  <span key={index} aria-hidden="true">
                    ★
                  </span>
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-stone-700 sm:mt-4">
                &ldquo;{review.text}&rdquo;
              </p>
              <footer className="mt-4 text-sm font-semibold text-brand-black sm:mt-5">
                {review.name}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
