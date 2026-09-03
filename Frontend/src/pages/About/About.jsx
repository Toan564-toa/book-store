import {
  faBookOpen,
  faLeaf,
  faHeart,
  faUsers,
  faQuoteLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import hero from "../../assets/hero.png";

const values = [
  {
    icon: faBookOpen,
    title: "Tuyển chọn kỹ lưỡng",
    desc: "Mỗi cuốn sách đều được chọn lọc cẩn thận để mang đến giá trị thực cho người đọc.",
  },
  {
    icon: faLeaf,
    title: "Không gian tinh tế",
    desc: "Chúng tôi tin rằng đọc sách là một trải nghiệm, không chỉ là hành động.",
  },
  {
    icon: faHeart,
    title: "Cộng đồng yêu sách",
    desc: "Kết nối những tâm hồn cùng yêu thích khám phá tri thức qua từng trang giấy.",
  },
  {
    icon: faUsers,
    title: "Phục vụ tận tâm",
    desc: "Đội ngũ tư vấn luôn sẵn sàng giúp bạn tìm được cuốn sách phù hợp nhất.",
  },
];

const stats = [
  { value: "10K+", label: "Đầu sách" },
  { value: "50K+", label: "Khách hàng" },
  { value: "98%", label: "Hài lòng" },
  { value: "5+", label: "Năm kinh nghiệm" },
];

const team = [
  { name: "Nguyễn Minh Anh", role: "Người sáng lập", initial: "MA" },
  { name: "Trần Quốc Bảo", role: "Giám đốc nội dung", initial: "QB" },
  { name: "Lê Hồng Phương", role: "Trưởng phòng CSKH", initial: "HP" },
];

const About = () => {
  return (
    <main className="text-[#334b3b]">
      <section className="banner relative h-[480px] flex items-center">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12 text-white">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#cfd6c8]">
            Về chúng tôi
          </p>
          <h1 className="mt-4 text-4xl font-medium leading-tight sm:text-5xl lg:text-6xl">
            Câu chuyện của <br />
            <span className="text-[#f1f0e8]">Lumina Books</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[#e6ebe0]">
            Hành trình mang sách đến gần hơn với mỗi người Việt — chậm lại, tĩnh
            lặng và đầy cảm hứng.
          </p>
        </div>
      </section>

      <section className="bg-[#faf9f2] py-16 sm:py-20">
        <div className="container mx-auto grid items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:px-12">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#859080]">
              Câu chuyện
            </p>
            <h2 className="mt-3 text-3xl font-medium leading-tight sm:text-4xl">
              Chúng tôi tin vào sức mạnh của trang sách
            </h2>
            <div className="mt-6 space-y-4 text-[15px] leading-7 text-[#586158]">
              <p>
                Lumina Books ra đời từ niềm tin rằng mỗi cuốn sách là một ngọn
                đèn — soi sáng những góc tối trong tâm hồn và mở ra những chân
                trời mới. Chúng tôi không chỉ bán sách, mà kiến tạo một không
                gian để bạn chậm lại giữa nhịp sống hối hả.
              </p>
              <p>
                Với hơn 10.000 đầu sách được tuyển chọn từ trong nước và quốc
                tế, chúng tôi mong muốn đồng hành cùng bạn trên hành trình tìm
                kiếm tri thức, cảm xúc và sự bình yên.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/books"
                className="rounded-md bg-[#31563d] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#24452f]"
              >
                Khám phá sách
              </Link>
              <Link
                to="/blog"
                className="rounded-md border border-[#31563d] px-5 py-2.5 text-sm font-medium text-[#31563d] transition hover:bg-[#f1f0e8]"
              >
                Đọc blog
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src={hero}
              alt="Về Lumina Books"
              className="w-full max-w-md rounded-lg object-cover shadow-md"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#859080]">
              Giá trị cốt lõi
            </p>
            <h2 className="mt-3 text-3xl font-medium sm:text-4xl">
              Điều chúng tôi theo đuổi
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-lg border border-[#e8e6dc] bg-[#faf9f2] p-6 transition hover:border-[#31563d] hover:shadow-sm"
              >
                <FontAwesomeIcon
                  icon={v.icon}
                  className="text-2xl text-[#31563d]"
                />
                <h3 className="mt-4 text-lg font-medium">{v.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#586158]">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f1f0e8] py-16 sm:py-20">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-4xl font-semibold text-[#31563d] sm:text-5xl">
                  {s.value}
                </p>
                <p className="mt-2 text-sm uppercase tracking-wider text-[#586158]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#859080]">
              Đội ngũ
            </p>
            <h2 className="mt-3 text-3xl font-medium sm:text-4xl">
              Những người đứng sau Lumina
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {team.map((t) => (
              <div
                key={t.name}
                className="rounded-lg border border-[#e8e6dc] bg-white p-6 text-center transition hover:shadow-sm"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#31563d] text-2xl font-semibold text-white">
                  {t.initial}
                </div>
                <h3 className="mt-4 text-lg font-medium">{t.name}</h3>
                <p className="mt-1 text-sm text-[#586158]">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#faf9f2] py-16 sm:py-20">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-sm sm:p-12">
            <FontAwesomeIcon
              icon={faQuoteLeft}
              className="text-3xl text-[#c8cec2]"
            />
            <p className="mt-4 text-xl leading-8 text-[#334b3b] sm:text-2xl">
              "Một cuốn sách thật sự hay có thể thay đổi cả một ngày của bạn.
              Chúng tôi muốn giúp bạn tìm được cuốn sách ấy."
            </p>
            <p className="mt-6 text-sm font-medium text-[#31563d]">
              — Đội ngũ Lumina Books
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#31563d] py-16 text-white sm:py-20">
        <div className="container mx-auto px-5 text-center sm:px-8 lg:px-12">
          <h2 className="text-3xl font-medium sm:text-4xl">
            Sẵn sàng bắt đầu hành trình đọc?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[#e6ebe0]">
            Khám phá hàng nghìn cuốn sách hay đang chờ bạn. Đăng ký tài khoản
            để nhận những gợi ý phù hợp với sở thích của bạn.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/register"
              className="rounded-md bg-white px-5 py-2.5 text-sm font-medium text-[#31563d] transition hover:bg-[#f1f0e8]"
            >
              Đăng ký ngay
            </Link>
            <Link
              to="/books"
              className="rounded-md border border-white px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white hover:text-[#31563d]"
            >
              Xem sách
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
