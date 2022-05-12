# Anodos
anonymous todo list ระบบ todos ที่ไม่ระบุตัวตนที่สามารถเข้าใช้งานได้จากหลายอุปกรณ์ ภายในจะประกอบไปด้วยแอพพลิเคชั่นที่พัฒนาด้วยภาษา SWIFT และ api เซิร์ฟเวอร์ที่พัฒนาด้วยเฟรมเวิร์ค Nest.js ในภาษา Typescript

จัดทำขึ้นเพื่อรวบรวมวิธีการใช้งาน Git และ GitHub จากประสบการณ์ใช้งานใน 4 ปีที่ผ่านมาภายใน repository นี้จะประกอบไปด้วยโปรเจ็คสำเร็จรูปที่พร้อมนำไปศึกษาต่อได้ เพื่อให้ผู้ที่เข้ามาอ่านได้มีความเข้าใจในเรื่องดังต่อไป
* GitHub Flow
* Conventional Commits 
* GitHub Actions
* การออกแบบ CI/CD Pipeline
---
## GitHub Flow
GitHub Flow คือรูปแบบการพัฒนาโปรแกรมร่วมกับ Git และ GitHub โดยมีการพัฒนามาจาก Git Flow โดยวิธีการนี้จะมุ่งเน้นในการ Deploy โปรแกรมเวอร์ชั่นใหม่ให้เร็วที่สุดเช่น อาจจะ Deploy ทุกวันเป็นต้น การทำงานตามระบบ GitHub Flow มีข้อกำหนดดังนี้
1. ทุกอย่างที่อยู่ใน branch `main` จะต้องเป็นโปรแกรมที่ทดสอบผ่านและ deploy เรียบร้อยแล้ว
2. เมื่อต้องการพัฒนาหรือแก้ไขโค้ดให้สร้าง branch ใหม่จาก branch  `main` 
3. เมื่อพัฒนาเรียบร้อยแล้วให้สร้าง `pull request` เพื่อทำการ merge เข้า branch `main` เท่านั่น
4. เมื่อมีการ push โค้ดเข้าสู่ branch `main` จะทำการ deploy ทันที

อ้างอิง https://githubflow.github.io/

## Conventianl Commits
การ commit โค้ดที่มีการเปลี่ยนแปลงระหว่างการพัฒนาถือว่าเป็นเรื่องพื้นฐานและควรทำอย่างสม่ำเสมอระหว่างการพัฒนาโปรแกรม Conventianl Commits เป็นรูปแบบการ commit แบบมาตราฐานเพื่อให้ผู้พัฒนาคนอื่นๆสามารถเข้าใจสิ่งที่มีการเปลี่ยนแปลงในแต่ละ commit ได้ง่าย โดยมีโครงสร้างดังนี้ 
```text
<type>[optional scope]: <description>
```
### โครงสร้าง
#### Type
ชนิดของงานที่ได้ทำซึ่งจะมีดังนี้ 
- build:    ใช้เมื่อมีการทำงานที่เกี่ยวกับการ Build (เช่น คำสั่ง npm หรือ การเพิ่ม External Dependencies เป็นต้น)
- docs:     ใช้เมื่อมีการทำงานที่เกี่ยวกับการปรับหรือแก้ไขเอกสาร
- feat:     ใช้เมื่อมีการเพิ่ม Feature
- fix:      ใช้เมื่อมีการแก้ไข Bug หรือแก้ไขตามรีวิว
- hotfix:   ใช้เมื่อมีการแก้ไข Bug หรือแก้ไขตามรีวิวที่เร่งด่วน
- perf:     ใช้เมื่อมีการทำงานที่เกี่ยวกับการปรับปรุงประสิทธิภาพ (เช่น ตัวระบบ หรือ Application)
- refactor: ใช้เมื่อมีการปรับปรุง Code เก่าที่เคยเขียนไว้แล้ว ให้ดีขึ้น สั้น กระชับ และมีประสิทธิภาพมากขึ้น
- style:    ใช้เมื่อมีการแก้หรือปรับ Format ต่าง ๆ ของ Code ที่ไม่กระทบกับการใช้งานของผู้ใช้ (เช่น semi-colons, quotes, trailing commas)
- test:     ใช้เมื่อมีการทำงานที่เกี่ยวกับการทดสอบ (เช่น การทำ Test Case เพิ่ม หรือปรับปรุง Test Case)
- update:   ใช้เมื่อมีการเพิ่มเติมเกี่ยวกับ Feature ที่กำลังทำ
- chore:    ใช้เมื่อทำงานทั่วไป เช่น เพิ่มไฟล์ ลบไฟล์ หรือทำงานที่ไม่ตรงตาม Type ที่มีข้างบนทั้งหมด

#### Scope(Optional)
Scope ของงานที่ได้ทำซึ่งอาจจะเป็น file, folder หรืออะไรก็ได้ เช่นถ้าเราเพิ่ม feature ในส่วนของ Login ซึ่งเกี่ยวข้องกับโฟลเดอร์ "authen" เราอาจจะ commit ด้วย 
"feat(authen): XXXXXXXXXXX" เป็นต้น ซึ่ง scope จะมีไม่มีก็ได้

#### Description
คำอธิบายรายละเอียดของงานที่ได้ทำอย่างเช่น 
"add LoginView.swift"
เพื่อเป็นการบอกว่าใน commit นี้เป็นการเพิ่ม file ที่ชื่อว่า LoginView เป็นต้น

## GitHub Actions
GitHub Actions คือ CI/CD platform ที่ช่วยให้ผู้ใช้งานสามารถสั่ง Build, Test, และ Deploy โปรเจคได้อย่างอัตโนมัติ ซึ่งผู้ใช้งานนั้นสามารถสร้าง Workflows ที่ช่วยในการ Build และ Test ในทุก ๆ การ Pull Request ภายใน Repository หรือจะเป็นการ Deploy software ไปยัง Production หลังจาก Merge Pull Request เสร็จเรียบร้อยก็สามารถทำได้เช่นกัน

สำหรับ Workflow นั้น GitHub Actions จะอนุญาตให้ผู้ใช้งานสามารถสั่งใช้งาน Workflow ได้ในทุก ๆ Event ที่เกิดขึ้นกับ Repository ยกตัวอย่างเช่น ผู้ใช้งานสามารถสั่งใช้งาน Workflow ได้เมื่อมีใครมาสร้าง Issue ใน Repository เป็นต้น

### ส่วนประกอบ
![overview-actions-simple](https://user-images.githubusercontent.com/52484219/167911945-b20ac543-150b-4505-9d8a-b29bb047b028.png)

#### Workflows
- Workflow คือ กระบวนการอัตโนมัติที่กำหนดค่าได้ ซึ่งใน Workflow จะเรียกใช้งานได้ตั้งแต่ 1 jobs ขึ้นไป
- สามารถเรียกใช้งานได้จาก event ใน repository, เรียกด้วยตนเอง, หรือจะตั้งเวลาไว้ก็ได้
- Workflow นั้นจะเป็นไฟล์ YAML ที่เก็บอยู่ใน .github/workflows ใน Repository
- ใน 1 repository สามารถมี workflow ได้หลายไฟล์ เช่น มี workflow ไว้สำหรับ build และ test pull request และมีอีก workflow ไว้สำหรับ deploy software เมื่อมีการสร้าง release

#### Events
- Event คือ เหตุการณ์ต่าง ๆ ที่เกิดขึ้นกับ repository ซึ่งใช้สำหรับการเรียกใช้งาน Workflows
- ตัวอย่าง event เช่น create pull request, opens an issue, pushes a commit, และ create release เป็นต้น

สามารถดู event เพิ่มเติมได้ที่: https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows

#### Jobs
- Job คือ ชุดของขั้นตอนใน Workflow ที่ดำเนินการบน Runner ตัวเดียวกัน
- แต่ละขั้นตอนจะเป็น Shell script และจะถูกเรียงลำดับการเรียกใช้ไว้
- สามารถแบ่งปันข้อมูลกันระหว่างแต่ละขั้นตอนได้
- สามารถกำหนด job's dependencies กับ job อื่น ๆ ได้ โดยทั่วไป jobs จะไม่มี dependencies ต่อกันและเรียกใช้งานแต่ละ job ควบคู่กันไป(Parallel)
- เมื่อ job มี dependency กับ job อื่น job นี้จะเรียกใช้งานก็ต่อเมื่อ job ก่อนหน้าทำงานเรียบร้อยแล้ว
- ตัวอย่างเช่น เราอาจจะมีหลาย ๆ jobs ที่สั่ง build หลาย ๆ architectures นั้นสามารถเรียกใช้งานได้พร้อมกันเพราะไม่มี dependency ต่อกัน และมี packaging job ที่มี dependency กับ build jobs ดังนั้น packaging job จะเรียกใช้งานก็ต่อเมื่อ build jobs ทำงานเสร็จหมดแล้ว

ศึกษาเพิ่มเติม: https://docs.github.com/en/actions/using-jobs

#### Actions
- Action คือ custom application สำหรับ GitHub Actions ที่มีการทำงานที่ซับซ้อนแต่ว่าเป็น task ที่เกิดขึ้นบ่อย ๆ
- Action จะใช้เพื่อช่วยลดจำนวนโค้ดที่ต้องเขียนซ้ำ ๆ ใน Workflow 
- เราสามารถสร้าง Action ขึ้นมาเองหรือจะหาจาก GitHub Marketplace มาใช้ก็ได้

ศึกษาการสร้าง Action เพิ่มเติมได้ที่: https://docs.github.com/en/actions/creating-actions

#### Runner
- Runner คือ Server ที่เรียกใช้งาน Workflows เมื่อ triggered
- แต่ละ runner สามารถเรียกใช้งาน 1 job ในช่วงเวลาใดเวลาหนึ่ง
- GitHub จะเตรียม Ubuntu Linux, Microsoft Windows, และ MacOS runner ไว้เพื่อสั่งเรียกใช้งาน workflows
- ถ้าต้องการ OS อื่นหรือต้องการ Hardware ที่เฉพาะเจาะจง สามารถ Host runner เองได้

ศึกษาการ Hosting runners เพิ่มเติมได้ที่: https://docs.github.com/en/actions/hosting-your-own-runners

### Syntax
****`on`****

คือเงื่อนไขที่กำหนดเพื่อให้ workflows ทำงานเมื่อเกิดเหตุการณ์นั่นๆขึ้น การทำหนดเงื่อนไขสามารถกำหนดได้หลายเงื่อนไขพร้อมกันโดยการทำงานเมื่อมีเงื่อนไขใดครบตัว workflow จะทำงานเช่น

สั่งให้ทำงานเมื่อมีการ push โค้ดขึ้น GitHub

```yaml
on: push
```

หรือสั่งให้ทำงานเมื่อมีการ push หรือ fork โค้ด

```yaml
on: [push, fork]
```

****`on.<pull_request|pull_request_target>.<branches|branches-ignore>`****

เป็นการกำหนดเงื่อนไขให้ workflow ทำงานเมื่อมีการเปิด pull request ไปยัง branch ที่กำหนดตัวอย่างเช่น

```yaml
on:
  pull_request:
    # Sequence of patterns matched against refs/heads
    branches:    
      - main
      - 'releases/**'
```

ตัว workflow จะทำงานเมื่อมีการเปิด pull request ไป branch ต่อไปนี้

- branch ชื่อ main
- branch ที่ชื่อขึ้นต้นด้วย release/ เช่น release/10

****`on.push.<branches|tags|branches-ignore|tags-ignore>`****

เป็นการกำหนดให้ workflow ทำงานเมื่อมีการ push โค้ดเข้าสู่ branch ที่กำหนดตัวอย่างเช่น

```yaml
on:
  push:
    # Sequence of patterns matched against refs/heads
    branches:    
      - main
      - 'releases/**'
```

ตัว workflow จะทำงานเมื่อมีการ push ไป branch ต่อไปนี้

- branch ชื่อ main
- branch ที่ชื่อขึ้นต้นด้วย release/ เช่น release/10

****`jobs.<job_id>.name`****

ชื่อของแต่ละ job ที่จะแสดงผลบน ui ของ GitHub Actions

****`jobs.<job_id>.needs`****

เป็นเงื่อนไขที่จะทำให้ job ทำงานได้โดยระบุว่าต้องมี job ใดทำสำเร็จก่อน สามารถระบุมากกว่า 1 job ได้ เช่น

```yaml
jobs:
  job1:
  job2:
    needs: job1
  job3:
    needs: [job1, job2]
```

จากตัวอย่าง job2 จะทำงานเมื่อ job1 ทำงานสำเร็จและ job3 จะทำงานเมื่อ job1 และ job2 ทำงานสำเร็จ

****`jobs.<job_id>.if`****

เป็นเงื่อนไขกำหนดว่าถ้าเงื่อนไขเป็นจริง job จะทำงานโดยสามารถใช้งาน output ของ job ก่อนหน้ามาเป็นตัวแปรในการตรวจสอบได้เช่น

```yaml
jobs:
  production-deploy:
    if: github.repository == 'octo-org/octo-repo-prod'
    runs-on: ubuntu-latest
```

จากตัวอย่าง job จะทำงานเมื่อ GitHub repository ที่สั่งให้ทำงานมีชื่อ repository ชื่อ `octo-org/octo-repo-prod`

****`jobs.<job_id>.runs-on`****

ใช้ run-on เพื่อกำหนดว่า job ที่ทำงานจะทำงานอยู่บน os ใดสามารถเลือกได้จาก 

****`jobs.<job_id>.outputs`****

สามารถใช้ outputs เพื่อกำหนด output ของ job ได้โดยเราสามารถใช้ output ไปใช้ต่อใน job อื่นๆ

```yaml
jobs:
  job1:
    runs-on: ubuntu-latest
    # Map a step output to a job output
    outputs:
      output1: ${{ steps.step1.outputs.test }}
      output2: ${{ steps.step2.outputs.test }}
steps:
      - id: step1
        run: echo "::set-output name=test::hello"
      - id: step2
        run: echo "::set-output name=test::world"
```

จากตัวอย่างกำหนดให้ job1 มี output คือ output1 และ output2 โดยกำหนดตัวแปรผ่านการสั่ง `set-output name=`  ในแต่ละ step

****`jobs.<job_id>.env`****

สามารถใช้ env เพื่อกำหนดตัวแปร environment ให้กับเครื่องที่รันได้

****`jobs.<job_id>.defaults.run`****

สามารถใช้ [defaults.run](http://defaults.run) เพื่อกำหนดค่าพื่นฐานต่างเช่น `working-directory`

****`jobs.<job_id>.steps`****

ในแต่ละ job จะมีส่วนประกอบย่อยเรียกว่า step เพื่อบอกว่าในแต่ละขั้นของ job จะทำอะไรบ้าง

```yaml
jobs:
  my-job:
    name: My Job
    runs-on: ubuntu-latest
    steps:
      - name: Print a greeting
        env:
          MY_VAR: Hi there! My name is
          FIRST_NAME: Mona
          MIDDLE_NAME: The
          LAST_NAME: Octocat
        run: |
          echo $MY_VAR $FIRST_NAME $MIDDLE_NAME $LAST_NAME.
```

จากตัวอย่างภายใน job เป็นการ step ชื่อ  Print a greeting โดยรันคำสั่ง `echo $MY_VAR $FIRST_NAME $MIDDLE_NAME $LAST_NAME.`

****`jobs.<job_id>.steps[*].name`****

ใช้ name เพื่อกำหนดชื่อของแต่ละ step ได้

****`jobs.<job_id>.steps[*].uses`****

การใช้ use เป็นส่วนที่เราสามารถใช้งาน GitHub workflow ที่นักพัฒนาคนอื่นทำไว้และ publish ใน GitHub repository อื่นๆได้โดยยึดตาม `{owner}/{repo}@{ref}`

```yaml
steps:
  # Reference the major version of a release
  - uses: actions/checkout@v3
```

จากตัวอย่างเป็นการใช้งาน workflow ใน repository ชื่อ checkout ของ user ชื่อ actions เลือกใช้งานจาก branch v3 

****`jobs.<job_id>.steps[*].run`****

ใช้งาน run เพื่อรันคำสั่ง linux หรือคำสั่งอื่นๆที่สอดคล้องกับ os ที่ job นั่นทำงานอยู่

****`jobs.<job_id>.steps[*].with`****

with เป็นการใช้งานคู่กับ uses โดยเป็นการกำหนด input ของ workflow ที่นำมาใช้งาน

```yaml
jobs:
  my_first_job:
    steps:
      - name: My first step
        uses: actions/hello_world@main
        with:
          first_name: Mona
          middle_name: The
          last_name: Octocat
```

จากตัวอย่างใน step มีการใช้งาน workflow `actions/hello_world@main`  โดยกำหนด input คือ first_name, middle_name และ last_name

## การออกแบบ CI/CD Pipeline

![CI-CD-Diagram drawio (2)](https://user-images.githubusercontent.com/52484219/167999407-b617c119-01e3-41c2-8ac1-2f120ab3e6db.svg)

แนวคิดในการออกแบบ pipeline เพื่อให้รองรับการใช้งาน การทดสอบ การ deploy สำหรับทดสอบ และ deploy สำหรับ production โดยแบ่งออกเป็น 3 ส่วนดังนี้

1. **Continuous Integration**
    
    ส่วนนี้จะทำงานเมื่อมี branch ใดๆเปิด pull request เข้าสู่ branch **main** จะทำการทดสอบโค้ดโดยใช้วิธีการทดสอบแบบ unit test และ e2e test
    
2. **Staging CD** 
    
    ส่วนนี้จะทำงานเมื่อมีการ merge โค้ดเข้า branch main จะทำการ build ในเวอร์ชั่นสำหรับทดสอบโดยจะทำการติด tag ชื่อ latest ไว้จากนั่นทำการ deploy backend ไปยังเซิร์ฟเวอร์สำหรับทดสอบและ upload แอพไปยัง testflight เพื่อรอให้ผู้มีส่วนเกี่ยวข้องมาทดสอบต่อไป
    
3. **Production CD**
    
    ส่วนนี้จะทำงานเมื่อมีการ release ที่ GitHub จะทำการ build ในเวอร์ชั่นสำหรับใช้งานจริงโดยจะทำการติด tag ตามที่ได้ตั้งค่าไว้ใน release จากนั่นทำการ deploy backend ไปยังเซิร์ฟเวอร์สำหรับใช้งานจริงและ upload แอพไปยัง testflight เพื่อรอให้ผู้มีส่วนเกี่ยวข้องมาใช้งานต่อไป
    
    
## ตัวอย่าง Pipeline
### CI (Continuous Integration)

```yaml
on:
  pull_request:
    branches: [main]
```

⇒ workflow จะทำงานเมื่อมีการสร้าง pull request ไปยัง branch main 

```yaml
jobs:
  check-file-changed:
    runs-on: ubuntu-latest
    outputs:
      api_changed: ${{ steps.api-changed-files.outputs.any_changed }}
      todo_list_changed: ${{ steps.todo-list-changed-files.outputs.any_changed }}
    steps:
      - uses: actions/checkout@v2
        with:
          fetch-depth: 2
      - name: Get changed files
        id: api-changed-files
        uses: tj-actions/changed-files@v14.1
        with:
          since_last_remote_commit: 'true'
          files: |
            api/
      - name: Get changed files
        id: todo-list-changed-files
        uses: tj-actions/changed-files@v14.1
        with:
          since_last_remote_commit: 'true'
          files: |
            todolist/
```

⇒ ใน job นี้จะทำการตรวจสอบการเปลี่ยนแปลงของไฟล์ใน folder api/ และ todolist/ ว่ามีไฟล์เปลี่ยนแปลงจาก commit ล่าสุดของ branch main หรือไม่ และทำการตั้งผลลัพธ์ที่ได้เป็น output ของ job เพื่อนำไปใช้งานใน job อื่นๆ

**หมายเหตุ**

⇒ การตรวจสอบความเปลี่ยนแปลงของแต่ละส่วนก่อนจะรันช่วยลดค่าใช้งานของ GitHub ลงได้ เนื่องจากการทำงานของ workflow มีการใช้งานฟรีที่จำกัดและ หากเกินจากมีการคิดเงินเพิ่ม

```yaml
api-unit-test:
    if: needs.check-file-changed.outputs.api_changed == 'true'
    needs:
      - check-file-changed
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./api
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Install node
        uses: actions/setup-node@v1
        with:
          node-version: 14.x
      - name: Install dependencies
        run: yarn install
      - name: Run Unit test
        run: yarn run test
      - name: Publish Unit Test Results
        uses: EnricoMi/publish-unit-test-result-action@v1
        if: always()
        with:
          files: api/junit.xml
```

⇒ ใน job นี้จะทำงานเมื่อมีการเปลี่ยนแปลงไฟล์ในโฟลเดอร์ api เท่านั่น จะทำการรันทดสอบโค้ดของ api ด้วยการทดสอบแบบ unit test ตามที่เขียนไว้และทำการอัพโหลดผลการทดสอบไปยัง pull request ที่สร้างไว้จะได้ผลตามนี้
<img width="912" alt="Screen Shot 2022-05-02 at 22 04 37" src="https://user-images.githubusercontent.com/52484219/167917770-7e5934b7-01e0-4f5d-a8f9-102593aea765.png">


```yaml
api-e2e-test:
    needs:
      - api-unit-test
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./api
    env:
      PORT: 8000
      MODE: development
      POSTGRES_HOST: 127.0.0.1
      POSTGRES_PORT: 5432
      POSTGRES_DB: postgres
      POSTGRES_USERNAME: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_SYNC: true
      POSTGRES_DROP: false
      POSTGRES_LOGGING: true
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: create postgres container
        run: docker-compose up -d postgres
      - name: Install node
        uses: actions/setup-node@v1
        with:
          node-version: 14.x
      - name: Install dependencies
        run: yarn install
      - name: Run e2e test
        run: yarn run test:e2e
```

⇒ ใน job นี้จะทำงานเมื่อ job api-unit-test ทำงานสำเร็จแล้ว เป็นการทดสอบโค้ดแบบ e2e โดยจะทำการจำลองสภาพแวดล้อมของ server และทำการทดสอบตามที่เขียนไว้

```yaml
todo-list-unit-test:    
    if: needs.check-file-changed.outputs.todo_list_changed == 'true'
    needs:
      - check-file-changed
    runs-on: macos-latest
    defaults:
      run:
        working-directory: ./todolist
    steps:
      - uses: actions/checkout@v2
      - name: Build and test
        run:  |
          xcodebuild -target todolist.xcodeproj \
            -scheme todolist \
            -destination 'platform=iOS Simulator,OS=15.2,name=iPhone 12 mini' \
            -resultBundlePath TestResults \
            test
      - uses: kishikawakatsumi/xcresulttool@v1
        with:
          path: ./todolist/TestResults.xcresult
        if: success() || failure()
```

⇒ ใน job นี้จะทำงานเมื่อมีการเปลี่ยนแปลงไฟล์ในโฟลเดอร์ todolist เท่านั่น เป็นการทดสอบ application ตามที่ได้เขียนไว้และ อัพโหลดผลการทดสอบไปยัง pull request ที่สร้างจะได้ผลลัพธ์ตามนี้

<img width="791" alt="Screen Shot 2022-05-02 at 22 08 00" src="https://user-images.githubusercontent.com/52484219/167917884-4f75a80b-9e61-4f7c-b0d9-9f4146b2a0b5.png">


เมื่อทำงาน workflow ทำงานจะได้ภาพรวมดังนี้ 

<img width="1062" alt="Screen Shot 2022-05-02 at 22 26 40" src="https://user-images.githubusercontent.com/52484219/167917926-2fcfa49d-e1d8-4b6a-ae83-992cd278b5f9.png">
