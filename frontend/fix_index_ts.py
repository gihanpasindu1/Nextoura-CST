with open('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/frontend/src/routes/index.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
skip = False
skip_count = 0

for i, line in enumerate(lines):
    if '{/* Credentials Dialog */}' in line and i < 1600:
        skip = True
        skip_count = 32  # 32 lines to skip (842 to 873 inclusive)
    
    if skip and skip_count > 0:
        skip_count -= 1
        continue
    else:
        skip = False
        new_lines.append(line)

with open('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/frontend/src/routes/index.tsx', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Removed extra dialog blocks.")
