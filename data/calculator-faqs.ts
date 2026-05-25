export type FaqItem = {
  question: string;
  answer: string;
};

export const bmiFaqs: FaqItem[] = [
  {
    question: "What is BMI?",
    answer:
      "BMI (Body Mass Index) is a numerical value calculated from your height and weight using the formula: weight (kg) ÷ height² (m²). It is widely used as a quick screening tool to classify whether a person is underweight, in a healthy range, overweight, or obese — without needing any specialized equipment.",
  },
  {
    question: "How is BMI calculated?",
    answer:
      "BMI is calculated by dividing your weight in kilograms by the square of your height in metres. For example, a person who weighs 70 kg and is 1.75 m tall has a BMI of 70 ÷ (1.75 × 1.75) = 22.9. In imperial units, the formula is: (weight in lbs ÷ height in inches²) × 703.",
  },
  {
    question: "What BMI range is considered normal?",
    answer:
      "According to WHO (World Health Organization) guidelines, a BMI between 18.5 and 24.9 is considered the healthy range for most adults. Below 18.5 is underweight, 25–29.9 is overweight, and 30 or above is classified as obese. However, these thresholds may vary slightly by age and ethnicity.",
  },
  {
    question: "What does a BMI of 22, 25, 27, or 30 mean?",
    answer:
      "A BMI of 22 falls in the healthy range (18.5–24.9). A BMI of 25 is the borderline between healthy and overweight. A BMI of 27 is in the overweight range (25–29.9), and a BMI of 30 or above is classified as obese. Each category carries different health implications, though BMI alone is not a definitive diagnosis.",
  },
  {
    question: "Is BMI always accurate?",
    answer:
      "No — BMI is a useful population-level screening tool but has well-known limitations. It cannot distinguish between muscle and fat, so a heavily muscled athlete may register as 'overweight' despite being in excellent health. Conversely, someone with low muscle mass and high body fat (sometimes called 'skinny fat') may show a normal BMI despite having an unfavorable body composition.",
  },
  {
    question: "Is BMI different for men and women?",
    answer:
      "The BMI formula and standard categories are the same for both men and women, but the interpretation can differ. Women naturally carry a higher percentage of body fat than men at the same BMI. Some researchers argue that separate BMI thresholds for men and women would be more clinically accurate, though the standard WHO ranges are still universally applied.",
  },
  {
    question: "Does BMI apply to children and teenagers?",
    answer:
      "Not in the same way. For people under 18, a separate metric called BMI-for-age percentile is used, which factors in age and sex alongside height and weight. A child is considered healthy between the 5th and 85th percentile, overweight between the 85th and 95th, and obese above the 95th percentile for their age group.",
  },
  {
    question: "Does ethnicity affect how BMI should be interpreted?",
    answer:
      "Yes — this is an important nuance. Research shows that people of South Asian, East Asian, and Middle Eastern descent tend to develop metabolic health risks at lower BMI values than people of European descent. For these groups, a BMI of 23 or above may already indicate elevated health risk, which is why some health authorities use adjusted thresholds.",
  },
  {
    question: "What is a healthy BMI for Indians?",
    answer:
      "For the Indian population, health authorities such as the Indian Council of Medical Research (ICMR) recommend a healthy BMI range of 18.5–22.9 — slightly lower than the standard WHO range. A BMI of 23–24.9 is considered overweight, and 25 or above is classified as obese for Indians, due to higher cardiometabolic risk at lower body weights.",
  },
  {
    question: "Can I have a normal BMI but still be unhealthy?",
    answer:
      "Yes. A condition sometimes called 'metabolically obese normal weight' (MONW) or 'skinny fat' occurs when someone has a normal BMI but carries excess visceral fat around the abdominal organs. This can increase the risk of type 2 diabetes, heart disease, and other metabolic conditions despite a deceptively normal BMI reading.",
  },
  {
    question: "Should I use BMI alone to judge my health?",
    answer:
      "No — BMI is best used as one data point among many. A more comprehensive picture of your health includes waist circumference, body fat percentage, blood pressure, fasting blood glucose, cholesterol levels, sleep quality, and fitness level. Think of BMI as a preliminary indicator, not a definitive verdict on your health.",
  },
  {
    question: "How can I lower my BMI in a healthy way?",
    answer:
      "The most sustainable way to lower BMI is through a moderate calorie deficit combined with regular physical activity — particularly strength training to preserve muscle mass. Crash diets may reduce BMI rapidly but often lead to muscle loss and metabolic adaptation. Aiming for a gradual weight loss of 0.5–1 kg per week is generally considered the most efficacious long-term approach.",
  },
];
export const bmrFaqs: FaqItem[] = [
  {
    question: "What is BMR?",
    answer:
      "BMR (Basal Metabolic Rate) is the number of calories your body burns each day at complete rest — simply to sustain vital functions like breathing, circulation, brain activity, and cell repair. It represents your bare minimum calorie floor and forms the foundation of all daily calorie and diet calculations.",
  },
  {
    question: "How is BMR calculated?",
    answer:
      "BMR is calculated using established formulas based on your age, gender, height, and weight. The most widely used is the Mifflin-St Jeor equation: For men: (10 × weight in kg) + (6.25 × height in cm) − (5 × age) + 5. For women: (10 × weight in kg) + (6.25 × height in cm) − (5 × age) − 161. Our calculator uses this formula as it is considered the most accurate for the general population.",
  },
  {
    question: "What is the difference between BMR and TDEE?",
    answer:
      "BMR is your calorie need at complete rest — if you did nothing all day. TDEE (Total Daily Energy Expenditure) is your real-world daily calorie need, calculated by multiplying your BMR by an activity factor. For example, a moderately active person uses a multiplier of 1.55×, so a BMR of 1,330 kcal becomes a TDEE of roughly 2,062 kcal/day.",
  },
  {
    question: "What is the Mifflin-St Jeor formula and why is it used?",
    answer:
      "The Mifflin-St Jeor equation, developed in 1990, is the most validated BMR formula for modern adults. Multiple clinical studies have confirmed it outperforms older equations like Harris-Benedict in predicting actual resting energy expenditure. This is why most reputable nutrition tools — including ours — use it as the default formula.",
  },
  {
    question: "What activity factor should I choose?",
    answer:
      "Choose based on your honest weekly activity pattern: Sedentary (1.2×) for desk jobs with little movement; Lightly active (1.375×) for light exercise 1–3 days/week; Moderately active (1.55×) for exercise 3–5 days/week; Very active (1.725×) for hard training 6–7 days/week; Extra active (1.9×) for physical jobs plus intense daily training. Most people overestimate their activity level — when in doubt, choose one level lower.",
  },
  {
    question: "Why does BMR change over time?",
    answer:
      "BMR fluctuates with age, body weight, muscle mass, hormonal changes, and overall health. After age 30, BMR tends to decline gradually as muscle mass decreases. Significant weight loss also lowers BMR — a phenomenon called metabolic adaptation — where the body becomes more frugal with calories as a survival response to prolonged deficits.",
  },
  {
    question: "Can I use BMR for weight loss planning?",
    answer:
      "BMR alone is not the right target for weight loss — it represents the absolute minimum your body needs to function. Always start from your TDEE (maintenance calories) and create a moderate deficit of 300–500 kcal below that. Eating at or below your BMR for extended periods can trigger muscle loss, hormonal disruption, and metabolic slowdown.",
  },
  {
    question: "Does more muscle mass increase BMR?",
    answer:
      "Yes — this is one of the most important relationships in metabolism. Muscle tissue is metabolically active, burning roughly 3× more calories at rest than fat tissue. This is why two people with the same weight and height can have noticeably different BMRs depending on their body composition. Strength training is one of the most efficacious long-term strategies to raise your resting metabolism.",
  },
  {
    question: "Is BMR different for men and women?",
    answer:
      "Yes. Men generally have a higher BMR than women of the same age, height, and weight — primarily because men naturally carry more muscle mass and less body fat. Hormonal differences also play a role. For example, testosterone promotes muscle retention, while estrogen is associated with higher fat storage, both of which directly influence resting calorie burn.",
  },
  {
    question: "How accurate are BMR estimates?",
    answer:
      "BMR formulas are population-level estimates with a typical margin of error of ±10%. Individual factors like gut microbiome, genetics, thyroid function, medications, sleep quality, and stress levels can cause your real BMR to deviate from the formula's output. The best approach is to use your calculated TDEE as a starting point, then adjust by 100–200 kcal based on your actual body weight trend over 2–3 weeks.",
  },
];
export const bodyFatFaqs: FaqItem[] = [
  {
    question: "What does body fat percentage mean?",
    answer:
      "Body fat percentage is the proportion of your total body weight that comes from fat tissue, as opposed to lean mass (muscle, bone, water, and organs). For example, a person weighing 60 kg with 27% body fat carries approximately 16.2 kg of fat and 43.8 kg of lean mass. It is a far more precise indicator of body composition than weight or BMI alone.",
  },
  {
    question: "How does this body fat calculator work?",
    answer:
      "This calculator uses the U.S. Navy method, which estimates body fat percentage from body circumference measurements — waist, neck, and hip (for women) — along with height. These measurements are plugged into a logarithmic formula developed by the U.S. Navy to provide a quick, equipment-free body fat estimate.",
  },
  {
    question: "What is a healthy body fat percentage for men and women?",
    answer:
      "Healthy body fat ranges differ significantly by gender. For men: Essential fat is 2–5%, Athletic is 6–13%, Fit is 14–17%, Average is 18–24%, and Obese is 25%+. For women: Essential fat is 10–13%, Athletic is 14–20%, Fit is 21–24%, Average is 25–31%, and Obese is 32%+. Women naturally carry more essential fat due to hormonal and reproductive physiology.",
  },
  {
    question: "What is the U.S. Navy method and how accurate is it?",
    answer:
      "The U.S. Navy method is a circumference-based body fat estimation formula developed for military fitness assessments. Studies show it has a margin of error of roughly ±3–4% compared to gold-standard methods like DEXA scans. It is considered reliable for general population use and significantly more informative than BMI, though measurement accuracy is critical to getting a meaningful result.",
  },
  {
    question: "Is body fat percentage more useful than BMI?",
    answer:
      "In most cases, yes. BMI only uses height and weight, making it unable to differentiate between muscle and fat. Body fat percentage directly measures fat mass versus lean mass, making it far more elucidative of your actual body composition. A muscular athlete and an sedentary person can share the same BMI but have vastly different body fat percentages and health profiles.",
  },
  {
    question: "Is the body fat result exact?",
    answer:
      "No — it is a circumference-based estimate. Factors that can affect accuracy include tape placement, posture during measurement, hydration level, time of day, and individual body shape variations. For the most consistent results, measure in the morning before eating, keep the tape parallel to the ground, and take each measurement 2–3 times and use the average.",
  },
  {
    question: "What is fat mass and lean mass?",
    answer:
      "Fat mass is the total weight of all fat tissue in your body, including essential fat (needed for organ protection and hormonal function) and storage fat. Lean mass is everything else — muscles, bones, organs, water, and connective tissue. Tracking both numbers, not just total weight, gives a much clearer picture of whether you are losing fat or muscle during a diet.",
  },
  {
    question: "What is visceral fat and is it different from body fat percentage?",
    answer:
      "Yes — they measure different things. Body fat percentage includes all fat in your body. Visceral fat specifically refers to fat stored deep inside the abdominal cavity, surrounding your organs. Even someone with an average body fat percentage can carry dangerous levels of visceral fat if their waist measurement is high. A large waist circumference (above 80 cm for women, 94 cm for men) is an independent risk marker for metabolic disease.",
  },
  {
    question: "How can I reduce my body fat percentage?",
    answer:
      "The most effective approach is a combination of a moderate calorie deficit, adequate protein intake (to preserve lean mass), and regular resistance training. Cardio accelerates fat loss but without strength training, you risk losing muscle alongside fat. Sustainable fat loss of 0.5–1% body fat per month is realistic and minimizes the metabolic adaptation that comes with aggressive cutting.",
  },
  {
    question: "Can body fat percentage be too low?",
    answer:
      "Yes — going below essential fat levels is dangerous. For men, dropping below 4–5% and for women below 10–12% can disrupt hormonal function, impair immune response, cause bone density loss, and lead to serious health complications. Female athletes who drop too low often experience a condition called Female Athlete Triad — a combination of low energy availability, loss of menstrual cycle, and bone deterioration.",
  },
  {
    question: "What are more accurate ways to measure body fat?",
    answer:
      "More precise methods include DEXA scan (dual-energy X-ray absorptiometry) — considered the gold standard with ±1–2% accuracy; Hydrostatic weighing (underwater weighing); Bod Pod (air displacement); and Skinfold calipers used by a trained professional. These methods are more accurate than circumference-based calculators but require specialized equipment or clinical settings.",
  },
];
export const idealWeightFaqs: FaqItem[] = [
  {
    question: "What is an ideal weight calculator?",
    answer:
      "An ideal weight calculator uses scientifically established formulas to estimate a healthy target weight range based primarily on your height and gender. Our calculator goes further by simultaneously comparing four major formulas — Devine, Robinson, Miller, and Hamwi — alongside a BMI healthy reference band, giving you a well-rounded target range rather than a single arbitrary number.",
  },
  {
    question: "How is ideal weight calculated?",
    answer:
      "Most ideal weight formulas use height as the primary input. For example, the Devine formula calculates: For men: 50 kg + 2.3 kg per inch over 5 feet. For women: 45.5 kg + 2.3 kg per inch over 5 feet. Robinson, Miller, and Hamwi follow similar structures with slightly different base values and multipliers — which is why they produce a spread of results rather than one identical number.",
  },
  {
    question: "Why are there multiple ideal weight formulas?",
    answer:
      "Each formula was developed independently in different clinical contexts — Devine in 1974 for drug dosing, Hamwi in 1964 for diabetes management, and Robinson and Miller as refinements in the 1980s. Since no single formula was designed as a universal fitness standard, showing all four gives you a more realistic comparison range rather than placing blind trust in one equation.",
  },
  {
    question: "Which ideal weight formula is most accurate?",
    answer:
      "No single formula is universally superior — each has its own origin and limitations. The Devine formula is the most widely cited in clinical and pharmaceutical settings and serves as our primary estimate. However, the most pragmatic approach is to treat the full formula range (e.g., 56.4–59.8 kg) as your target band rather than fixating on any single number.",
  },
  {
    question: "What is a healthy weight for my height?",
    answer:
      "A healthy weight range depends on both your height and gender. As a general reference using BMI 18.5–24.9: for a height of 160 cm, the healthy range is roughly 47–63 kg; for 170 cm, it is 53–72 kg; for 180 cm, it is 60–81 kg. Our calculator gives you a precise BMI healthy reference band alongside formula estimates for your specific height and gender.",
  },
  {
    question: "Should ideal weight be treated as a fixed goal?",
    answer:
      "No — ideal weight formulas are population-level estimates, not personalized prescriptions. They do not account for muscle mass, bone density, frame size, body fat distribution, age, or ethnicity. A professional athlete and a sedentary person of identical height may have the same 'ideal weight' output, but their actual optimal weights could differ by 10–15 kg or more.",
  },
  {
    question: "Is ideal weight the same as healthy weight?",
    answer:
      "Not exactly — they are related but distinct concepts. Ideal weight (from Devine, Robinson, etc.) is a formula-based target. Healthy weight is typically defined as falling within a BMI of 18.5–24.9. Our calculator shows both side by side: the formula-derived target weight and the broader BMI healthy reference band, so you can see how they compare for your specific measurements.",
  },
  {
    question: "Does ideal weight change with age?",
    answer:
      "The standard formulas do not change their output with age — they are primarily driven by height and gender. However, in practice, body composition shifts significantly with age: muscle mass declines and fat mass tends to increase. This means an older adult may technically be within their 'ideal weight' range while carrying an unfavorable body composition. Age is a contextual factor the formulas cannot fully capture.",
  },
  {
    question: "Is ideal weight different for men and women of the same height?",
    answer:
      "Yes. All four formulas — Devine, Robinson, Miller, and Hamwi — use different base values for men and women. Women generally have a slightly lower ideal weight estimate at the same height, reflecting differences in average bone density, muscle mass, and body frame. For example, at 165 cm, the Devine formula returns 56.9 kg for women and approximately 65.8 kg for men.",
  },
  {
    question: "What if my current weight is far from the ideal weight estimate?",
    answer:
      "Use the estimate as a directional reference, not a definitive benchmark. If there is a large discrepancy, focus on gradual, sustainable progress — aiming to lose or gain 0.5–1 kg per week. Consulting a doctor or registered dietitian is advisable if the gap is substantial, as they can provide a more nuanced target that accounts for your individual health history, body composition, and lifestyle.",
  },
];
export const waterFaqs: FaqItem[] = [
  {
    question: "How much water should I drink per day?",
    answer:
      "Daily water needs depend on body weight, activity level, and climate. A common guideline is 15.5 cups (3.7L) for men and 11.5 cups (2.7L) for women. Our calculator provides a personalized recommendation based on your specific weight and activity level.",
  },
  {
    question: "Does exercise increase water needs?",
    answer:
      "Yes. Physical activity and sweating increase fluid loss, so you need more water to replace what you lose. The more intense your workout, the more hydration you need.",
  },
  {
    question: "Can I drink too much water?",
    answer:
      "Yes, drinking excessive amounts in a short time can cause hyponatremia (water intoxication). However, this is rare. Following a personalized hydration plan makes it unlikely to happen.",
  },
  {
    question: "What are signs I need more water?",
    answer:
      "Dark yellow urine, thirst, dry mouth, headaches, fatigue, and reduced exercise performance are common signs of dehydration. Pale yellow urine indicates good hydration.",
  },
  {
    question: "How does body weight affect water intake?",
    answer:
      "Heavier individuals need more water because they have more body mass and higher metabolic rates. That's why personalized calculators are better than generic recommendations.",
  },
  {
    question: "Can I get water from other drinks and food?",
    answer:
      "Yes. About 20% of daily water comes from water-rich foods like fruits and vegetables. Other beverages like tea, milk, and coffee also contribute, though plain water is best.",
  },
  {
    question: "What formula does this calculator use?",
    answer:
      "The formula is: Body weight (kg) × 35 ml = Daily water intake. Then adjust by activity level: Low (×1.0), Moderate (×1.2), High (×1.4).",
  },
  {
    question: "Why is hydration important?",
    answer:
      "Water regulates body temperature, transports nutrients, supports digestion, lubricates joints, improves brain function, and boosts energy and athletic performance.",
  },
];
export const calorieFaqs: FaqItem[] = [
  {
    question: "What does a calorie calculator estimate?",
    answer:
      "A calorie calculator estimates how many calories your body needs each day based on your age, gender, height, weight, and activity level. It uses this data to calculate your BMR and TDEE, then gives you tailored targets for weight loss, maintenance, or weight gain.",
  },
  {
    question: "What is BMR and why does it matter?",
    answer:
      "BMR (Basal Metabolic Rate) is the number of calories your body burns at complete rest — just to keep vital functions like breathing, circulation, and cell repair running. It forms the foundation of all calorie calculations. Even if you stayed in bed all day, your body would still need this many calories to survive.",
  },
  {
    question: "What are maintenance calories?",
    answer:
      "Maintenance calories are the total number of calories you need each day to keep your body weight stable, factoring in your activity level on top of your BMR. Eating consistently above this leads to weight gain; consistently below leads to weight loss.",
  },
  {
    question: "What is TDEE and how is it different from BMR?",
    answer:
      "TDEE (Total Daily Energy Expenditure) is your total calorie burn including all physical activity, while BMR is only what you burn at rest. TDEE = BMR × an activity multiplier. For example, someone with a BMR of 1,655 kcal who exercises moderately may have a TDEE of around 2,500 kcal/day.",
  },
  {
    question: "How many calories should I eat to lose weight?",
    answer:
      "A mild deficit of 250–300 calories below your maintenance is ideal for steady, sustainable fat loss of roughly 0.25–0.5 kg per week. A moderate deficit of 500 calories/day can produce faster results but may be harder to maintain. Dropping below 1,200 kcal/day (women) or 1,500 kcal/day (men) is generally not recommended without medical supervision.",
  },
  {
    question: "How much of a calorie deficit is usually reasonable?",
    answer:
      "Most people do well starting with a 250–500 calorie daily deficit below their maintenance level. Aggressive deficits beyond 700–1,000 calories can lead to muscle loss, fatigue, nutritional deficiencies, and metabolic adaptation — where your body compensates by burning fewer calories overall.",
  },
  {
    question: "How many calories do I need to gain weight or build muscle?",
    answer:
      "To gain weight gradually, aim for a caloric surplus of 250–500 calories above your maintenance level. This mild weight gain approach minimizes excess fat accumulation while giving your muscles the energy they need to grow. Eating in a surplus of 1,000+ calories typically leads to more fat gain than muscle.",
  },
  {
    question: "Does age affect how many calories I need?",
    answer:
      "Yes, significantly. As you age, muscle mass naturally declines and metabolism slows — a process called sarcopenia. Most people experience a drop of roughly 1–2% in metabolic rate per decade after age 30. This is why calorie needs tend to decrease with age even if activity levels remain the same.",
  },
  {
    question: "Why do men and women have different calorie needs?",
    answer:
      "Men generally have higher calorie requirements because they tend to carry more muscle mass and less body fat than women of the same weight and height. Muscle tissue burns more calories at rest than fat tissue, which is why body composition — not just body weight — plays a pivotal role in determining calorie needs.",
  },
  {
    question: "How does activity level change my daily calorie needs?",
    answer:
      "Activity level is one of the most consequential factors in your calorie estimate. A sedentary person uses a multiplier of ~1.2× their BMR, while someone with a very active job or intense daily training may need 1.7–1.9× their BMR. Even small increases in daily movement — like walking more — can raise your TDEE noticeably over time.",
  },
  {
    question: "Why should I not rely on calorie estimates alone?",
    answer:
      "Formula-based estimates are a reliable starting point but cannot account for individual variables like hormonal differences, gut health, sleep quality, stress levels, medications, or metabolic adaptation. The best approach is to use the calculator's output as a baseline, then track your body weight trend over 2–3 weeks and adjust your intake by 100–200 calories accordingly.",
  },
  {
    question: "How often should I recalculate my calorie needs?",
    answer:
      "Recalculate every time your weight changes by 3–5 kg, your activity level shifts, or your goal changes. As your body weight decreases during a diet, your BMR also decreases — meaning your original calorie target gradually becomes less accurate. Regular recalculation ensures your targets remain aligned with your current physiology.",
  },
];
export const macroFaqs: FaqItem[] = [
  {
    question: "What does a macro calculator show?",
    answer:
      "A macro calculator estimates your total daily calorie needs and breaks them down into the three macronutrients — protein, carbohydrates, and fat — based on your age, gender, height, weight, activity level, and fitness goal. The result gives you a practical daily target in grams for each macro.",
  },
  {
    question: "What are macros and why do they matter?",
    answer:
      "Macros (macronutrients) are the three main nutrients your body uses for energy: protein (4 kcal/g), carbohydrates (4 kcal/g), and fat (9 kcal/g). Tracking them matters because the ratio of each macro directly influences body composition, energy levels, and performance — not just total calories alone.",
  },
  {
    question: "Which macro plan should I choose?",
    answer:
      "Balanced (30/40/30) is the best starting point for most people. Low Carb works well for those managing blood sugar or preferring fat as fuel. Low Fat suits those focused on high-volume eating. High Protein is ideal for muscle building or preserving lean mass during a cut. Custom Plan lets you set your own percentages if you have specific guidance from a nutritionist.",
  },
  {
    question: "What is a good macro split for weight loss?",
    answer:
      "A commonly recommended split for weight loss is 40% protein, 30% carbs, and 30% fat. Higher protein during a calorie deficit helps preserve muscle mass and keeps you fuller for longer. However, the most effective split is one you can sustain consistently — use the Custom Plan option to dial in your preferred ratio.",
  },
  {
    question: "What is a good macro split for muscle gain?",
    answer:
      "For muscle gain, a typical split is 30–35% protein, 40–50% carbs, and 20–25% fat. Carbohydrates are the primary fuel for intense training, while protein provides the building blocks for muscle repair and growth. Our High Protein plan is a strong starting point for this goal.",
  },
  {
    question: "Why must custom macros equal 100%?",
    answer:
      "Protein, carbohydrates, and fat together account for 100% of your caloric intake. If they don't add up to 100%, the calculator cannot accurately convert your macro split into precise gram targets. Think of it like slicing a pie — all the pieces must cover the whole pie.",
  },
  {
    question: "How often should I recalculate my macros?",
    answer:
      "Recalculate your macros every 4–6 weeks, or whenever your weight changes by more than 3–5 kg, your activity level shifts, or your goal changes. As your body composition evolves, your caloric and macro needs become increasingly disparate from your original estimate — so regular recalculation keeps your targets accurate.",
  },
  {
    question: "Are macro results exact?",
    answer:
      "No — macro targets are evidence-based estimates, not absolute prescriptions. Your real needs fluctuate with training intensity, sleep quality, stress levels, hormonal changes, and metabolic adaptation over time. Treat the numbers as a reliable starting point and adjust based on how your body responds over 2–3 weeks.",
  },
];
export const proteinFaqs: FaqItem[] = [
  {
    question: "How does the protein calculator work?",
    answer:
      "Our calculator uses your age, gender, height, weight, activity level, and fitness goal to estimate your optimal daily protein intake. It applies scientifically-backed body weight multipliers to give you a recommended range — along with the calories that protein contributes to your diet.",
  },
  {
    question: "How much protein do I need per day?",
    answer:
      "A common range is 0.8 to 2.2 grams per kilogram of body weight, depending on your activity level and goal. Sedentary adults typically need 0.8g/kg, moderate exercisers need 1.4–1.6g/kg, and those building muscle may need up to 2.0–2.2g/kg. Use the calculator above for your personalized estimate.",
  },
  {
    question: "Is 100g of protein a day enough to build muscle?",
    answer:
      "It depends on your body weight. A person weighing 70–80 kg doing regular strength training typically needs 112–160g of protein per day for muscle growth. 100g may suffice for lighter individuals or those in a maintenance phase, but heavier or more active people will likely need more.",
  },
  {
    question: "Why does weight loss increase protein needs?",
    answer:
      "During a calorie deficit, higher protein intake helps preserve lean muscle mass and supports satiety, reducing the chances of overeating. It also has a higher thermic effect than carbs or fats, meaning your body burns more calories digesting it.",
  },
  {
    question: "What happens if I eat too much or too little protein?",
    answer:
      "Too little protein can lead to muscle loss, slower recovery, fatigue, and a weakened immune system. Consistently eating far too much — especially without adequate hydration — may stress the kidneys over time. Staying within your recommended range, as shown by this calculator, is the safest approach.",
  },
  {
    question: "Which foods are highest in protein?",
    answer:
      "Top high-protein foods include chicken breast (~31g per 100g), eggs (~13g per 100g), paneer or cottage cheese (~18g per 100g), lentils (~9g per 100g cooked), Greek yogurt (~10g per 100g), tuna or salmon (~25–30g per 100g), and whey protein powder (~25g per scoop).",
  },
  {
    question: "Is this calculator accurate for vegetarians and vegans?",
    answer:
      "Yes — the calculator gives you an accurate protein target regardless of your diet. However, since many plant-based proteins are incomplete (missing some essential amino acids), vegetarians and vegans may benefit from increasing their target by 10–15% and combining sources like rice with lentils, or chickpeas with quinoa.",
  },
  {
    question: "Should protein intake change as I age?",
    answer:
      "Yes. After age 40, the body becomes less efficient at utilizing dietary protein — a phenomenon known as anabolic resistance. Adults over 50 are generally advised to consume 1.2–1.6g/kg of protein per day, higher than younger adults, to help preserve muscle mass and prevent age-related muscle loss.",
  },
];
