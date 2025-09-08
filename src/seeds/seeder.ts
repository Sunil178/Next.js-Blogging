import dbConnect from "@/libs/db-connect";
import Post from "@/models/Post";
import User from "@/models/User";
import Category from "@/models/Category";
import postsData from "./posts.json";
import categoriesData from "./categories.json";

const seedPosts = async () => {
  try {
    await dbConnect();
    console.log("Connected to MongoDB");

    // ---- STEP 1: get CLI args ----
    const args = process.argv.slice(2);
    const userArg = args.find(arg => arg.startsWith("--user="));
    if (!userArg) throw new Error("❌ Please provide a username/email with --user=<value>");

    const userValue = userArg.split("=")[1];
    if (!userValue) throw new Error("❌ Invalid --user argument");

    // ---- STEP 2: find user ----
    const user = await User.findOne({
      $or: [{ username: userValue }, { email: userValue }]
    });

    if (!user) throw new Error(`❌ User not found for username/email: ${userValue}`);
    console.log(`✅ Found user: ${user.username || user.email}`);

    // ---- STEP 3: seed categories ----
    const categories: Record<string, any> = {};
    for (const cat of categoriesData) {
      let category = await Category.findOne({ slug: cat.slug });
      if (!category) {
        category = await Category.create({ visibility: true, ...cat });
        console.log(`📂 Category created: ${cat.title}`);
      } else {
        console.log(`📂 Category exists: ${cat.title}`);
      }
      categories[cat.slug] = category._id;
    }

    // ---- STEP 4: seed posts ----
    for (const raw of postsData) {
      const exists = await Post.findOne({ slug: raw.slug });
      if (exists) {
        console.log(`⚠️ Post already exists: ${raw.slug}`);
        continue;
      }

      const categoryId = categories[raw.categorySlug];
      if (!categoryId) {
        console.log(`❌ Category not found for slug: ${raw.categorySlug}, skipping...`);
        continue;
      }

      await Post.create({
        ...raw,
        userId: user._id,
        categoryId,
      });

      console.log(`📝 Post created: ${raw.title}`);
    }

    console.log("🎉 Seeding completed.");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding posts:", error);
    process.exit(1);
  }
};

seedPosts();
