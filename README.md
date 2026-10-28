# drive-project-forward

연구 프로젝트를 목표 쪽으로 추진하는 Claude Code 플러그인이다. 목표와 달성 기준을 문서 하나(`GOAL.md`)로 정하고, 미팅마다 설명 자료를 슬라이드로 만들고, 미팅에서 정한 것을 미팅 노트로 남긴다.

한 세션에서 연구 논의를 이어가면 세부 내용으로 빠지고, 결론을 서두르고, 문서에 이전 결정이 덧붙여져 나열이 되기 쉽다. 이 플러그인은 목표를 위에 두고, 미팅 단위로 이해하고 결정하고 기록하는 순서를 고정한다.

## 스킬

| 스킬 | 하는 일 | 만드는 파일 |
|---|---|---|
| `goal` | 사용자에게 묻고 배경(동기), 목표, 달성 기준, 일정을 정한다. 처음 한 번 쓴다 | `GOAL.md` |
| `meet` | 미팅 전: 방법이 어떻게 동작하고 결과가 왜 그렇게 나왔는지 설명하는 자료를 만든다. 미팅 뒤: 정한 것, 할 일, 보류한 질문을 기록하고, 사용자가 목표 자체를 조정했을 때만 `GOAL.md`를 고친다 | `meetings/YYYY-MM-DD-slides.md`·`.html`, `meetings/YYYY-MM-DD-note.md` |
| `wrapup` | 프로젝트 밖의 사람에게 보일 발표 자료를 만든다. 듣는 사람, 발표 시간, 목적을 먼저 묻는다 | `wrapup/YYYY-MM-DD-<듣는 사람>.md`·`.html` |

슬라이드는 `slides/RULES.md`의 규칙과 `slides/template.html`로 만든다. 한 장에 메시지 하나, 구체적인 명사구 제목, 논문 수준의 구조도와 부분 확대, 색의 의미(하늘색은 처음 보는 것, 빨간색은 중요한 것, 나머지는 텍스트와 그림의 연결), 한국어·영어 전환을 따른다.

## 사용 순서

1. `/drive-project-forward:goal`: `GOAL.md`를 만든다.
2. 미팅 전 `/drive-project-forward:meet`: 설명 자료와 슬라이드를 만든다.
3. 미팅에서 사용자가 자료를 보고 이해하고 결정한다.
4. 미팅 뒤 "미팅 정리해": `meet`가 미팅 노트를 쓴다. 다음 미팅 자료는 이 노트의 할 일을 리마인드로 대조한다.
5. 공유가 필요하면 `/drive-project-forward:wrapup`.

스킬은 결론을 내리거나 결정하지 않는다. 결정은 사용자가 하고, 모든 파일은 저장 전에 전문을 보이고 확인받는다. 커밋은 사용자가 요청할 때만 한다.

## 설치

Claude Code에서 다음을 실행한다. 이 저장소는 비공개이므로, 설치하는 컴퓨터에서 이 저장소에 접근할 수 있는 GitHub 인증(`gh auth login` 등)이 필요하다.

```
/plugin marketplace add JuwonHwang/drive-project-forward
/plugin install drive-project-forward@drive-project-forward
```

슬라이드 확인 절차의 화면 캡처는 Chrome(헤드리스)을 쓴다. Chrome이 없으면 캡처를 건너뛴다.

## 라이선스

MIT
